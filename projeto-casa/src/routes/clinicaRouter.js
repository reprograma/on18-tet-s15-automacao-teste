const rotas = require("express").Router()
const controller = require("../controllers/clinicaController")


rotas.post("/criarpaciente", controller.criarPaciente)
rotas.get("/buscartodospacientes", controller.buscarTodosPacientes)
rotas.get("/buscarpaciente/:id", controller.buscarPacienteId)
rotas.patch("/atualizarpaciente/:id", controller.atualizarPaciente)
rotas.delete("/deletarpaciente/:id", controller.deletarPaciente)

module.exports = rotas