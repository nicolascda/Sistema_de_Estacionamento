const { Prisma } = require("@prisma/client");
const prisma = require("../data/prisma.js");

const listar = async (req, res) => {
    try {
        const veiculos = await prisma.veiculos.findMany({
            include:  { client: true }
        });

        const resposta = veiculos.map(({ client, clientId, ...veiculo }) => ({
            ...veiculo,          
            cliente: client.nome 
        }));

        res.status(200).json(resposta).end();
    } catch (error) {
        res.status(500).json("Erro de servidor");
        throw error
    }

};

const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        if ( !data.placa || !data.modelo || !data.marca || !data.cor || !data.tipo || !data.clientId ) {
            return res.status(400).json({message: "Por favor coloque um valor para os campos do nome, placa, modelo, marca, cor, tipo e clientId"})
        }

        if ( !Number(data.clientId))
        {
            return res.status(400).json({message: "O valor do clientId tem que ser um número inteiro"})
        }
        data.clientId = Number(data.clientId);

        if ( String(data.placa).length != 7)
        {
            return res.status(400).json({message: "A placa do carro tem que possuir 7 digitos, sendo eles letras ou números"})
        }

        const veiculo = await prisma.veiculos.create({
            data
        });

        res.status(201).json(veiculo).end();
    } catch (error) {
        console.log(error.code)
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(400).json({ error: "A placa já foi cadastrada no sistema" });
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
            return res.status(400).json({ error: "O clienteId não existe" });
        }

        res.status(500).json("Erro de servidor")
        throw error
    }



};

module.exports = {
    listar,
    cadastrar
};