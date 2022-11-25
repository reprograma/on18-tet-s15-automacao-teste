const mongoose = require('mongoose'); //invoca o mongoose
const uri = process.env.MONGODB_URI //cria a URI com usuário e senha

const connect = async () => { //cria a função connect
try {
    await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    console.log("Banco de dados API DO ZERO conectado com sucesso!")
} catch (error) {
    console.log(error.message)
   }
}

module.exports = {
    connect
}; //exporta a fun