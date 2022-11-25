const path = require("path")
const dotenv = require("dotenv")

const loadEnv= () => {
    const env = dotenv.config({
        path: path.resolve(process.env.PWD, '.env')
    })
    
  if (env.error) throw error // se o env falhar usamos o throw
  process.env = Object.assign(process.env, env.parsed) // caso funcione, criamos uma copia com o object.assing
}

loadEnv() //invocá-lo novamente
