const { Prisma } = require("@prisma/client");
const prisma = require("../data/prisma.js");

const listar = async (req, res) => {
    try {
        const vagas = await prisma.vaga.findMany();
        res.status(200).json(vagas).end();
        
    } catch (error) {
        res.status(500).json("Erro de servidor");
        throw error
    }
} 

const cadastrar = async(req, res) => {
    try {
        const data = req.body;

        if ( !data.numero || !data.setor || !data.tipo)
        {
            return res.status(400).json({message: "Por favor coloque um valor para os campos do numero, setor e tipo"})
        }

        if ( data.status && data.status != "LIVRE" && data.status != "OCUPADA" && data.status != "MANUNTENCAO")
        {
            return res.status(400).json({message: "O status da vaga só pode ser LIVRE, OCUPADA ou MANUNTENCAO"})
        }

        const vaga = await prisma.vaga.create({
            data
        });

        res.status(201).json(vaga).end()
        
    } catch (error) {
        console.log(error.code)
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(400).json({ error: "A vaga já foi cadastrada no sistema" });
        }

        res.status(500).json("Erro de servidor");
        throw error
    }
}

module.exports = {
    listar,
    cadastrar
}