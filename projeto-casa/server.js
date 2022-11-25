require('dotenv').config() //invoca o dotenv

const app = require('./src/app') //invoca app

const PORT = process.env.PORT // traz o valor de port do arquivo .env

app.listen(PORT, () => console.log(`Servidor On, Bem-vindos a clínica Saúde ${PORT}!`)) //define a porta do servidor