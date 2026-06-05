const express = require('express')
const router = express.Router();

const {listar, entrar, sair} = require( "../controllers/movimentacao.controller.js");

/**
 * @swagger
 * /movimentacoes:
 *  get:
 *      summary: Listar movimentações
 *      tags: [Movimentacoes]
 *      responses:
 *          200:
 *              description: Uma lista de movimentações retornada com sucesso
 */
router.get("/", listar);

/**
 * @swagger
 * /movimentacoes/entrada:
 *   post:
 *     summary: Cadastra uma nova movimentação
 *     tags: [Movimentacoes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [valorHora, veiculoId, vagaId, usuarioId]
 *             properties:
 *               valorHora:          
 *                 type: number
 *                 example: 15.25
 *               status:          
 *                 type: string
 *                 example: "ABERTO"
 *               veiculoId:
 *                 type: integer
 *                 example: 26
 *               vagaId: 
 *                 type: integer
 *                 example: 22
 *               usuarioId: 
 *                 type: integer
 *                 example: 16
 *     responses:
 *       201:
 *         description: Retorna a movimentação que foi criada
 *       400:
 *         description: Erro de requisição (campo faltando informação ou informação está errada)
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Falta de dados básicos
 *                 value: 
 *                   message: "Por favor coloque um valor para os campos da valorHora, veiculoId, vagaId e usuarioId"
 *               StatusDiferenteDeAberto:
 *                 summary: O status da movimentação está com um valor diferente de ABERTO
 *                 value: 
 *                   message: "O status da movimentação tem que ser ABERTO"
 *               VagaOcupada:
 *                 summary: A vaga está ocupada
 *                 value: 
 *                   message: "está vaga já está ocupada, verifique outra vaga"
 *               VagaManuntencao:
 *                 summary: A vaga está em manuntenção
 *                 value: 
 *                   message: "Essa vaga está em manuntenção"
 *               IDsComValoresErrados:
 *                 summary: Verifique se os valores da vagaId, usuarioId e veiculoId realmente existem
 *                 value: 
 *                   error: "Verifique se os valores da vagaId, usuarioId e veiculoId existem"
 *       500:
 *         description: Erro de servidor
 */
router.post("/entrada", entrar);

/**
 * @swagger
 * /movimentacoes/saida/{id}:
 *   put:
 *     summary: Atualiza uma movimentação
 *     tags: [Movimentacoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da movimentação
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [dataSaida]
 *             properties:
 *               dataSaida:          
 *                 type: string
 *                 example: "2026-06-05 20:37:50"
 *     responses:
 *       200:
 *         description: Retorna a movimentacao atualizada
 *       400:
 *         description: Erro de requisição (campo faltando informação ou informação está errada)
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Falta de dados básicos
 *                 value: 
 *                   message: "O campo de valor da Saida tem que ter um valor"
 *               ValorSaidaFormatoErrado:
 *                 summary: Formato da data do valor saida está errado
 *                 value: 
 *                   message: O formato da data precisa ser AAAA-MM-DD HH:MM:SS ou Ano-Mês-Dia Horas:Minutos:Segundos"
 *               HorarioSaidaMenorQueEntrada:
 *                 summary: O hórario da saida menor que o da entrada
 *                 value: 
 *                   message: "O horário da Saida tem que saior maior que o da entrada"
 *               MovimentacaoFinalizada:
 *                 summary: A movimentação já foi finalizada
 *                 value: 
 *                   message: "essa movimentação já foi finalizada"
 *       404:
 *         description: Movimentação não encontrada
 *       500:
 *         description: Erro de servidor
 */
router.put("/saida/:id", sair);

module.exports = router;