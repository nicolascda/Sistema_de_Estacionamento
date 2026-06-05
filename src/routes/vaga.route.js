const express = require('express')
const router = express.Router();

const {listar, cadastrar} = require( "../controllers/vaga.controller.js");

/**
 * @swagger
 * /vagas:
 *  get:
 *      summary: Listar vagas
 *      tags: [Vagas]
 *      responses:
 *          200:
 *              description: Uma lista de vagas retornada com sucesso
 */
router.get("/", listar);

/**
 * @swagger
 * /vagas:
 *   post:
 *     summary: Cadastra uma nova vaga
 *     tags: [Vagas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [numero, setor, tipo]
 *             properties:
 *               numero:          
 *                 type: string
 *                 example: "3B"
 *               setor:
 *                 type: string
 *                 example: "B"
 *               tipo: 
 *                 type: string
 *                 example: "GRANDE"
 *               status: 
 *                 type: string
 *                 example: "LIVRE"
 *     responses:
 *       201:
 *         description: Retorna a vaga que foi criada
 *       400:
 *         description: Erro de requisição (campo faltando informação ou informação está errada)
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Falta de dados básicos
 *                 value: 
 *                   message: "Por favor coloque um valor para os campos do numero, setor e tipo"
 *               VagaStatusErrado:
 *                 summary: A vaga está com um status errado
 *                 value: 
 *                   message: "O status da vaga só pode ser LIVRE, OCUPADA ou MANUNTENCAO"
 *               VagaJaCadastrada:
 *                 summary: A vaga já foi cadastrada
 *                 value: 
 *                   error: "A vaga já foi cadastrada no sistema"
 *       500:
 *         description: Erro de servidor
 */
router.post("/", cadastrar);

module.exports = router;