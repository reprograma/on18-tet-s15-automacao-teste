//arquivo de configuração do jest

const path = require("path")
const dotenv = require("dotenv")

const loadEnv = () => {
  const env = dotenv.config({
    path: path.resolve(process.env.PWD, '.env.test')
  })

  if (env.err) throw err
  process.env = Object.assign(process.env, env.parsed)
}

loadEnv()

// a linha 11 só funcionou quando eu colocou err e não error
// o .env.test - eu separo o meu ambiente de desenvolvimento do meu ambiente de teste.