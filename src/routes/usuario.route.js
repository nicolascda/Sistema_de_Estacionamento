const express = require('express')
const router = express.Router();

const {listar, listarPorId, cadastrar, atualizar, deletar} = require( "../controllers/usuario.controller.js");

router.get("/", listar);
router.get("/:id", listarPorId);
router.post("/", cadastrar);
router.put("/:id", atualizar);
router.delete("/:id", deletar);

module.exports = router;