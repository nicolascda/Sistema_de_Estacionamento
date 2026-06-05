const express = require('express')
const router = express.Router();

const {listar, entrar, sair} = require( "../controllers/movimentacao.controller.js");

router.get("/", listar);
router.post("/entrada", entrar);
router.put("/saida/:id", sair);

module.exports = router;