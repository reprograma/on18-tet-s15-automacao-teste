const express = require('express');
const router = express.Router();

const controller = require('../controllers/bibliotecaController');

router.get("/all", controller.all);
router.get("/buscar/:id", controller.obterBibliotecaPorId);
router.post("/criar", controller.criarBiblioteca);
router.patch("/atualizar/:id", controller.atualizarBiblioteca);
router.delete("/deletar/:id", controller.deletarBiblioteca);

module.exports = router;