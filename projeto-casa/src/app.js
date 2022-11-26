require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const db = require('../src/config/mongoConnect')
const bibliotecaRoutes = require("./routes/bibliotecaRoutes");
// const userRoutes = require('./routes/userRoutes');


db.connect()

app.use(express.json())
app.use(cors())

app.use("/bibliotecas", bibliotecaRoutes);
// app.use("/users", userRoutes)


module.exports = app