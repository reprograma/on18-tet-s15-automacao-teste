const mongoose = require("mongoose");

const pacientesSchema = mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  nome: {
      type: String,
      required: true
  },
  telefone: {
      type: String,
      required: true
  },
  cidade: {
    type: String,
    required: false,
  },
  plano_saude: {
    type: String,
    required: true
},
  plano_saude_numero: {
  type: Number,
  required: false
}
});

const date = new Date().toLocaleString();
console.log(date)
module.exports = mongoose.model("pacientes", pacientesSchema);