const express = require("express");
const router = express.Router();

const controller = require("../controllers/bibliotecaController");

//const { checkAuth } = require('../middlewares/auth')

router.post("/criar", controller.criarBiblioteca);
router.get("/buscar", controller.buscarBibliotecas);
router.get("/buscar/:id", controller.buscarBibliotecaPorId);
router.delete("/deletar/:id", controller.deletarBiblioteca);
router.put("/update/:id", controller.update);
router.patch("/atualizar/:id", controller.atualizarBiblioteca); 

module.exports = router;