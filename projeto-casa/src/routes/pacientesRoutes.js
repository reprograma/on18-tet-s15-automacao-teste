const express = require("express")

const router = express.Router()

const controller = require("../controllers/pacienteController")

router.post("/criar", controller.criarPaciente)

router.get("/buscar", controller.buscarPaciente)

router.get("/buscar/:id", controller.buscarPacientePorId)

router.delete("/deletar/:id", controller.deletarPaciente)

router.patch("/atualizar/:id", controller.atualizarPaciente)

module.exports = router

