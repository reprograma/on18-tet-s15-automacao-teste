require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

const database = require('./database/mongoConfig');
const pacienteRoutes = require('./routes/pacienteRoutes')

app.use(cors());
app.use(express.json());


app.use('/paciente', pacienteRoutes)

database.connect();

module.exports = app;



