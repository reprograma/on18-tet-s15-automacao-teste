require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pacientesRoutes = require('./Routes/pacientesRoutes')
const db = require('../src/config/mongoConfig')

const app = express()

db.connect()

app.use(express.json())
app.use(cors())

app.use('/pacientes', pacientesRoutes)

module.exports = app