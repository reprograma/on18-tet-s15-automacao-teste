
require("dotenv").config()


const express = require("express")
const cors = require("cors")
const app = express()

const database = require('./database/moogoseConnect')
const bibliotecaRoutes = require("./routes/BibliotecaRoutes")

const useroutes = require('./routes/userRoutes')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/", bibliotecaRoutes)
app.use("/autenticacao", useroutes)

database.connect(); 

module.exports = app 