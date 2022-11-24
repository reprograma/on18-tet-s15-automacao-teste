//importa mongoose
const mongoose = require('mongoose')
//Cria a estrutura de dados do BD
const cozinhaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cnpj: {
        type: Number,
        required: true
    },
    iniciativa_privada:{
        type: Boolean,
        required: true
    },
    endereco:{
        cep: {
            type: String,
            required: true
        },
        rua: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required:true
        },
        complemento: {
            type:String,
            required: false
        },
        referencia: {
            type: String,
            required: false
        },
        estado: {
            type: String,
            required: true
        },
        cidade: {
            type: String,
            required: true
        },
        bairro: {
            type: String,
            required:true
        }
    },
    bairros_atuantes:{
        type: Array,
        required:true
    },
    site: {
        type: String,
        required: false
    },
    atividades_disponiveis:{
        type: Array,
        required:true
    },
    pessoa_responsavel:{
        type: String,
        required: true
    }
})
//Exporta para uso externo
module.exports = mongoose.model('cozinha', cozinhaSchema)