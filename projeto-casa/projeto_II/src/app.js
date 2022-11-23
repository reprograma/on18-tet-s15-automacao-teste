//importa dotenv, express e cors
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

//importa dados para database e rotas
const database = require('./database/mongooseConnect')
const cozinhaRoutes = require('./routes/cozinhaRoutes')

app.use(cors())
app.use(express.json())

//adiciona rota fonte
app.use('/cozinha',cozinhaRoutes)

//conecta o BD
database.connect()

//exporta dados para uso externo
module.exports = app