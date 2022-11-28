const rotas = require("express").Router()
const controller = require("../controllers/pacienteController")

const { checkAuth } = require("../middlewares/auth");

rotas.get("/:id",checkAuth, controller.buscarPacienteId)
rotas.get("/",checkAuth, controller.buscarTodosPacientes)
rotas.post("/",checkAuth, controller.criarPaciente)
rotas.delete("/:id",checkAuth, controller.deletarPaciente)
rotas.patch("/:id",checkAuth, controller.atualizarPaciente)



module.exports = rotas