const rotas = require("express").Router()
const controller = require("../controllers/pacienteController")

rotas.get("/:id", controller.buscarPacienteId)
rotas.get("/", controller.buscarTodosPacientes)
rotas.post("/", controller.criarPaciente)
rotas.delete("/:id", controller.deletarPaciente)
rotas.patch("/:id", controller.atualizarPaciente)



module.exports = rotas