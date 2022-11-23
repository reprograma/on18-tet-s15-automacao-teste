require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const pacientesRotas = require("./routes/pacienteRoutes")

const database = require('./database/mongoConfig')

app.use(express.json())
app.use(cors())
app.use("/paciente", pacientesRotas)
database.connect()


module.exports = app