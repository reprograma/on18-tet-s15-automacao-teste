const mongoose = require('mongoose');

const bibliotecaSchema = new mongoose.Schema({
 
    nome: {
        type: String,
        required: true
    },

    cnpj: {
        type: String,
        required: true
    },

    telefone:{
        type: String,
        required: false
    },

    iniciativa_privada:{
        type: Boolean,
        required: false
    },

    endereco:{
        cep:{
            type: String,
            required: true
        },
        rua:{
            type: String,
            required: true
        },
        numero:{
            type: Number,
            required: true
        },
        complemento:{
            type: String,
            required: false
        },
        referencia: {
            type: String,
            required: false
        },
        estado:{
            type: String,
            required: true
        },
        cidade:{
            type: String,
            required: true
        },
        bairro:{
            type: String,
            required: true
        }
    },

    bairros_atuantes:[String],

    site:{
        type: String,
        required: false
    },

    atividades_disponiveis:[String],
    
    responsavel: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model('biblioteca', bibliotecaSchema) 