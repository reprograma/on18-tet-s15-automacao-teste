const express = require('express')

const router = express.Router()

const controller = require('../controllers/BibliotecaController')

const {checKAuth} = require("../middlewares/auth")  


router.post("/biblioteca",controller.criarBiblioteca)
router.delete("/deletar/:id", checKAuth,controller.deletarBibliotecaPorId)
router.get("/biblioteca/buscar", controller.buscarBiblioteca)
router.get("/biblioteca/buscar/:id", checKAuth,controller.buscaBibliotecaPorId)
router.patch("/atualizar/:id", checKAuth,controller.atualizarBiblioteca)






module.exports = router 