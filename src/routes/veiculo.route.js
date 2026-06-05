const express = require('express')
const router = express.Router();

const {listar, cadastrar} = require( "../controllers/veiculo.controller.js");

/**
 * @swagger
 * /veiculos:
 *  get:
 *      summary: Listar veiculos
 *      tags: [Veiculos]
 *      responses:
 *          200:
 *              description: Uma lista de veiculos retornada com sucesso
 */
router.get("/", listar);

/**
 * @swagger
 * /veiculos:
 *   post:
 *     summary: Cadastra um novo veiculo 
 *     tags: [Veiculos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [placa, modelo, marca, cor, tipo, clientId]
 *             properties:
 *               placa:          
 *                 type: string
 *                 example: "NCY3KH2"
 *               modelo:
 *                 type: string
 *                 example: "Buggie"
 *               marca: 
 *                 type: string
 *                 example: "Buggie do Mount"
 *               cor: 
 *                 type: string
 *                 example: "Vermelha"
 *               tipo: 
 *                 type: string
 *                 example: "Irado"
 *               clientId: 
 *                 type: integer
 *                 example: 12
 *     responses:
 *       201:
 *         description: Retorna o veiculo que foi criado
 *       400:
 *         description: Erro de requisição (campo faltando informação ou informação está errada)
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Falta de dados básicos
 *                 value: 
 *                   message: "Por favor coloque um valor para os campos do nome, placa, modelo, marca, cor, tipo e clientId"
 *               PlacaDoCarroMaisOuMenosDigitos:
 *                 summary: A placa do veiculo está com mais ou menos digitos que o normal
 *                 value: 
 *                   message: "A placa do carro tem que possuir 7 digitos, sendo eles letras ou números"
 *               PlacaJaCadastrada:
 *                 summary: A placa do carro já foi cadastrada
 *                 value: 
 *                   error: "A placa já foi cadastrada no sistema"
 *               ClientIdNaoExiste:
 *                 summary: O valor do clientId não existe
 *                 value: 
 *                   error: "O clienteId não existe"
 *       500:
 *         description: Erro de servidor
 */
router.post("/", cadastrar);

module.exports = router;