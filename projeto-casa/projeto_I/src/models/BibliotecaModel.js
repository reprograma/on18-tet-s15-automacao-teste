const mongoose = require("mongoose")

const bibliotecaSchema = new mongoose.Schema({
    id:{
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    nome:{
        type: String,
        required: true
    },
    cnpj:{
        type: String,
        required: true
    },
    telefone:{
        type: String
        
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    isIniciativaPrivada:{
        type: Boolean,
        
    },
    endereco:{
        cep: String,
        rua: String,
        numero: String,
        complemento: String,
        referencia: String,
        estado: String,
        cidade: String,
        bairro: String,
    },
    bairros_atuantes: [],
    site:{
        type: String,
        required: false
    } ,
    atividades_disponiveis: [],
    pessoa_responsavel: {
        type: String,
        required: true
    }
},  { timestamps : true })

    module.exports = mongoose.model("biblioteca",bibliotecaSchema)
    


