const { Prisma } = require("@prisma/client");
const prisma = require("../data/prisma.js");

const listar = async (req, res) => {
    try {
        const movimentacao = await prisma.movimentacao.findMany({
            include:  { 
                usuario: true,
                vaga: true,
                veiculo: true
            }
        });

        const resposta = movimentacao.map(({ usuario, usuarioId, vaga , vagaId, veiculo, veiculoId, ...movimentacao }) => ({
            ...movimentacao,          
            usuario: usuario.nome,
            vaga: vaga.numero,
            veiculo: veiculo.placa
        })); 

        res.status(200).json(resposta).end();
    } catch (error) {
        res.status(500).json("Erro de servidor");
        throw error
    }

};

const entrar = async (req, res) => {
    try {
        const data = req.body;

        if ( !data.valorHora || !data.veiculoId || !data.vagaId || !data.usuarioId  ) {
            return res.status(400).json({message: "Por favor coloque um valor para os campos da valorHora, veiculoId, vagaId e usuarioId"})
        }

        if ( !data.valorTotal)
        {
            data.valorTotal = 0
        }

        if ( data.status && data.status != "ABERTO")
        {
            return res.status(400).json({message: "O status da movimentação tem que ser ABERTO"})
        }

        if ( !Number(data.valorHora) || !Number(data.vagaId) ||  !Number(data.veiculoId) ||  !Number(data.usuarioId))
        {
            return res.status(400).json({message: "O valor do clientId, vagaId, veiculoId e usuarioId e valorHora tem que ser um número inteiro"})
        }

        const vaga = await prisma.vaga.findUnique({
            where: {
                id: Number(data.vagaId)
            }
        });

        // console.log(vaga)
        if ( vaga && vaga.status == "OCUPADA")
        {
            return res.status(400).json({message: "está vaga já está ocupada, verifique outra vaga"})
        }

        if ( vaga && vaga.status == "MANUNTENCAO")
        {
            return res.status(400).json({message: "Essa vaga está em manuntenção"})
        }

        data.vagaId = Number(data.vagaId);
        data.veiculoId = Number(data.veiculoId);
        data.usuarioId = Number(data.usuarioId);
        data.valorHora = Number(data.valorHora);

        const veiculo = await prisma.movimentacao.create({
            data
        });
        
        if ( vaga)
        {
            const vagaAtualizada = await prisma.vaga.update({
                where: {
                    id: data.vagaId
                },
                data: {
                    status: "OCUPADA"
                }
            })
        }
        
        

        res.status(201).json(veiculo).end();
    } catch (error) {
        console.log(error.code)

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
            return res.status(400).json({ error: "Verifique se os valores da vagaId, usuarioId e veiculoId existem" });
        }

        res.status(500).json("Erro de servidor")
        throw error
    }



};

const sair = async (req, res) => {
    try {

        const { dataSaida } = req.body;
        const { id } = req.params;


        if (!dataSaida) {
            return res.status(400).json({message: "O campo de valor da Saida tem que ter um valor"})
        }

        if (dataSaida && isNaN(Date.parse(dataSaida)) ) {
            return res.status(400).json({ message: "O formato da data precisa ser AAAA-MM-DD HH:MM:SS ou Ano-Mês-Dia Horas:Minutos:Segundos" });
        }

        if (!id || !Number(id)) {
            return res.status(400).json("O valor do ID precisa existir, e necessita ser um número")
        }

        const ValorDaMovimentacao = await prisma.movimentacao.findUnique({
            where: {
                id: Number(id)
            }
        });
        

        if (!ValorDaMovimentacao)
        {
            return res.status(404).json({ error: "Movimentação não encontrada" })
        }

        // console.log( Math.floor((new Date(dataSaida).getTime()) / (60 * 60 * 1000)))
        // console.log( Math.floor((new Date(ValorDaMovimentacao.dataEntrada).getTime()) / (60 * 60 * 1000)))

        const tempoNaoFormatado = (new Date(dataSaida).getTime()) - (new Date(ValorDaMovimentacao.dataEntrada).getTime())
        const HorarioTotal = ( Math.floor(tempoNaoFormatado / (1000 * 60 * 60)))

        // console.log(valorTotal)
        // console.log(ValorDaMovimentacao.valorHora * HorarioTotal)

        if ( HorarioTotal < 0)
        {
            return res.status(400).json({message: "O horário da Saida tem que saior maior que o da entrada"})
        }

        if ( ValorDaMovimentacao.status == "FINALIZADA")
        {
            return res.status(400).json({message: "essa movimentação já foi finalizada"})
        }

        const movimentacao = await prisma.movimentacao.update({
            where: {
                id: Number(id)
            },
            data: {
                dataSaida: new Date(dataSaida),
                valorTotal: (ValorDaMovimentacao.valorHora * HorarioTotal),
                status: "FINALIZADA"
            }

        })

        const vagaAtualizada = await prisma.vaga.update({
            where: {
                id: ValorDaMovimentacao.vagaId
            },
            data: {
                status: "LIVRE"
            }
        })

        res.status(200).json(movimentacao).end()
    } catch (error) {
        console.log(error.code)
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: "Movimentação não encontrada" });
        }

        res.status(500).json("Erro de servidor");
        throw error
    }

}


module.exports = {
    listar,
    entrar,
    sair
};