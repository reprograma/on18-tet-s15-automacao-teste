//importa mongoose
const mongoose = require('mongoose')
//puxa o link externo do BD, este link encontra-se em uma variável cujo valor
//está no arquivo .env, pois possue credenciais de admin
//o arquivo .env está no gitignore, portanto não será
//enviado por questões de segurança
const uri = process.env.MONGODB_URI

//função de conexão do mongoose com o BD
//retorna mensagem se conectar com sucesso
const connect = async ()=>{
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Banco Conectado!')
    } catch (error) {
        console.log(error.message)
    }
}

//exporta conexão para uso externo
module.exports = {
    connect
}