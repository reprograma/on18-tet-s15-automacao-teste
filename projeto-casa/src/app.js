require('dotenv').config()//sempre primeiro
const express = require ('express')
const cors = require ("cors")
const app = express()

const database = require('./config/database')
const bibliotecaRoutes = require('./routes/bibliotecaRoutes')

app.use (cors())
app.use(express.json())

//routes roots
app.use('/biblioteca', bibliotecaRoutes)

database.connect()

module.exports = app