const { Prisma } = require("@prisma/client");
const prisma = require("../data/prisma.js");

const listar = async (req, res) => {
    try {
        const clientes = await prisma.client.findMany();
        res.status(200).json(clientes).end();
    } catch (error) {
        res.status(500).json("Erro de servidor");
        throw error
    }

};

const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        if (!data.nome || !data.cpf ) {
            return res.status(400).json({message: "Por favor coloque um valor para os campos do nome e cpf"})
        }

        if (String(data.cpf).length != 11)
        {
            return res.status(400).json({message: "O cpf tem que possuir 11 digitos"})
        }

        if( !Number(data.cpf))
        {
            return res.status(400).json({message: "O CPF não está somente com números"})
        }

        const cliente = await prisma.client.create({
            data
        });

        res.status(201).json(cliente);
    } catch (error) {
        console.log(error.code)
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(400).json({ error: "O cpf já foi cadastrado" });
        }

        res.status(500).json("Erro de servidor")
        throw error
    }



};

module.exports = {
    listar,
    cadastrar
};