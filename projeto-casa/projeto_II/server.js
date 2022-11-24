//importa dotenv e app para uso
require ('dotenv').config

const app = require('./src/app')
//a informa que a porta está em variável informada no arquivo .env
//este arquivo não será enviado com o projeto, pois
//se encontra no gitignore
const PORT = process.env.PORT

//GET teste, bloco mantido para referência
app.get('/', function(req,res){
    res.send({
        message: 'GET teste'
    })
})

//abre a porta informada em .env e informa qual é
app.listen(PORT, ()=>console.log(`Servidor ok - Porta ${PORT}`))