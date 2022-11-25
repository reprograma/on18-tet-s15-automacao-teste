const express = require('express');
const bibliotecaController = require("../controllers/BibliotecaController")
const router = express.Router();

router.get("/biblioteca", bibliotecaController.buscarBibliotecas)

router.get("/biblioteca/:id", bibliotecaController.buscarBibliotecaPorId)

router.post("/biblioteca", bibliotecaController.criarBiblioteca)

router.delete("/biblioteca/:id", bibliotecaController.deletarBiblioteca)

router.patch("/biblioteca/:id", bibliotecaController.atualizarBiblioteca)

module.exports = router;