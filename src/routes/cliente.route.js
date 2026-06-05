const express = require('express')
const router = express.Router();

const {listar, cadastrar} = require( "../controllers/cliente.controller.js");

/**
 * @swagger
 * /clientes:
 *  get:
 *      summary: Listar clientes
 *      tags: [Clientes]
 *      responses:
 *          200:
 *              description: Uma lista de clientes retornada com sucesso
 */
router.get("/", listar);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cadastra um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, cpf]
 *             properties:
 *               nome:          
 *                 type: string
 *                 example: "Yan Kelwin"
 *               cpf:
 *                 type: string
 *                 example: "45673409322"
 *               telefone: 
 *                 type: string
 *                 example: "11834052362"
 *     responses:
 *       201:
 *         description: Retorna o cliente que foi criado
 *       400:
 *         description: Erro de requisição (campo faltando informação ou informação está errada)
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Falta de dados básicos
 *                 value: 
 *                   message: "Por favor coloque um valor para os campos do nome e cpf"
 *               CpfCadastrado:
 *                 summary: O CPF já foi cadastrado
 *                 value: 
 *                   error: "O cpf já foi cadastrado"
 *               CpfComMaisOuMenosDigitos:
 *                 summary: O CPF tem mais ou menos digitos que o normal
 *                 value: 
 *                   message: "O cpf tem que possuir 11 digitos"
 *               CpfValorErrado:
 *                 summary: O CPF possui letras 
 *                 value: 
 *                   message: "O CPF não está somente com números"
 *       500:
 *         description: Erro de servidor
 */
router.post("/", cadastrar);

module.exports = router;