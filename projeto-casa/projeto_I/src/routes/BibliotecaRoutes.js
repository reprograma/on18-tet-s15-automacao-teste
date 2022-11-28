const express = require('express')

const router = express.Router()

const controller = require('../controllers/BibliotecaController')

const {checKAuth} = require("../middlewares/auth") 


router.post("/biblioteca",controller.criarBiblioteca)
router.delete("/biblioteca/:id", controller.deletarBibliotecaPorId)
router.get("/biblioteca/buscar", controller.buscarBiblioteca)
router.get("/biblioteca/:id", controller.buscaBibliotecaPorId)
router.patch("/atualizar/:id", controller.atualizarBiblioteca)






module.exports = router 