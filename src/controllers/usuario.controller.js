const { Prisma } = require("@prisma/client");
const prisma = require("../data/prisma.js");

const listar = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.status(200).json(usuarios).end();
    } catch (error) {
        res.status(500).json("Erro de servidor");
        throw error
    }

};

const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        if (!data.nome || !data.email || !data.senha ) {
            return res.status(400).json({message: "Por favor coloque um valor para os campos do nome, email e senha"})
        }
        data.nome = String(data.nome);
        data.email = String(data.email);
        data.senha = String(data.senha);

        const usuario = await prisma.usuario.create({
            data
        });

        res.status(201).json(usuario).end();
    } catch (error) {
        console.log(error.code)
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(400).json({ error: "O email já foi cadastrado" });
        }

        res.status(500).json("Erro de servidor")
        throw error
    }
};

const listarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !Number(id)) {
            return res.status(400).json("O valor do ID precisa existir, e necessita ser um número")
        }

        const usuario = await prisma.usuario.findUnique({
            where: {
                id: Number(id)
            }
        });

        if ( !usuario) {
            return res.status(404).json({message: "Usuario não encontrado"});
        }
        res.status(200).json(usuario).end();
    } catch (error) {
        res.status(500).json("Erro de servidor");
        throw error
    }
}

const atualizar = async (req, res) => {
    try {

        const data = req.body;
        const { id } = req.params;

        if (!data.nome || !data.email || !data.senha ) {
            return res.status(400).json({message: "Por favor coloque um valor para os campos do nome, email e senha"})
        }
       

        if (!id || !Number(id)) {
            return res.status(400).json("O valor do ID precisa existir, e necessita ser um número")
        }

        const usuario = await prisma.usuario.update({
            where: {
                id: Number(id)
            },
            data

        })

        res.status(200).json(usuario).end()
    } catch (error) {
        console.log(error.code)
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: "Usuario não encontrado" });
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(400).json({ error: "O email já foi cadastrado" });
        }

        res.status(500).json("Erro de servidor");
        throw error
    }

}

const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !Number(id)) {
            return res.status(400).json("O valor do ID precisa existir, e necessita ser um número")
        }

        const usuario = await prisma.usuario.delete({
            where: {
                id: Number(id)
            }
        })

        if (usuario.count == 0) {
            return res.status(404).json({message: "Usuario não foi encontrado"});
        }

        res.status(200).json({message: "Usuario deletado"}).end()
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: "Usuario não encontrado" });
        }

        res.status(500).json("Erro de servidor");
        throw error
    }

}

module.exports = {
    listar,
    listarPorId,
    cadastrar,
    atualizar,
    deletar
};