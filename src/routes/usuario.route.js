const express = require('express')
const router = express.Router();

const {listar, listarPorId, cadastrar, atualizar, deletar} = require( "../controllers/usuario.controller.js");

/**
 * @swagger
 * /usuarios:
 *  get:
 *      summary: Listar Usuarios
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: Uma lista de usuarios retornada com sucesso
 */
router.get("/", listar);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Pega um usuário específico
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mostra um usuário específico
 *       404:
 *         description: Usuario não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.get("/:id", listarPorId);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cadastra um novo Usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha]
 *             properties:
 *               nome:          
 *                 type: string
 *                 example: "Yan Kelwin"
 *               email:
 *                 type: string
 *                 example: "kwin@gmail.com"
 *               senha: 
 *                 type: string
 *                 example: "1234"
 *               perfil: 
 *                 type: string
 *                 example: "Funcionario"
 *     responses:
 *       201:
 *         description: Retorna o usuario que foi criado
 *       400:
 *         description: Erro de requisição (campo faltando informação ou informação está errada)
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Falta de dados básicos
 *                 value: 
 *                   message: "Por favor coloque um valor para os campos do nome, email e senha"
 *               EmailJaCadastrado:
 *                 summary: Email já cadastrado
 *                 value: 
 *                   error: "O email já foi cadastrado"
 *       500:
 *         description: Erro de servidor
 */
router.post("/", cadastrar);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuario
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:          
 *                 type: string
 *                 example: "Nicolas Claudino"
 *               email:
 *                 type: string
 *                 example: "nicolasclaudino@gmail.com"
 *               senha: 
 *                 type: string
 *                 example: "12345"
 *               perfil: 
 *                 type: string
 *                 example: "Administrador"
 *     responses:
 *       200:
 *         description: Retorna o usuario que foi atualizado
 *       400:
 *         description: Erro de requisição (campo faltando informação ou informação está errada)
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Falta de dados básicos
 *                 value: 
 *                   message: "Por favor coloque um valor para os campos do nome, email e senha"
 *               EmailJaCadastrado:
 *                 summary: Email já cadastrado
 *                 value: 
 *                   error: "O email já foi cadastrado"
 *       404:
 *         description: Usuario não encontrado
 *       500:
 *         description: Erro de servidor
 */
router.put("/:id", atualizar);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Remove um usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario deletado
 *       400:
 *         description: O valor do ID precisa existir, e necessita ser um número
 *       404:
 *         description: Usuario não encontrado
 */
router.delete("/:id", deletar);

module.exports = router;