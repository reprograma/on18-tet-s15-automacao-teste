const path = require("path")
const dotenv = require("dotenv")

const loadEnv = () => {
  const env = dotenv.config({
<<<<<<< HEAD
    path: path.resolve(process.env.PWD, '.env')
  })

  if (env.err) throw err
=======
    path: path.resolve(process.env.PWD, '.env.test')
  })

  if (env.error) throw error
>>>>>>> a47f9d3ef6195d0c679fbd81dce9a72cf2a81277
  process.env = Object.assign(process.env, env.parsed)
}

loadEnv()