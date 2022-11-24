
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const produtosRoutes = require('./routes/produtosRoutes')
const db = require('../src/config/mongoConnect')


const app = express()

db.connect()

app.use(express.json())
app.use(cors())

app.use('/produtos', produtosRoutes)

module.exports = app