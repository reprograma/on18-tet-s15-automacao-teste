const mongoose = require("mongoose");

const produtosSchema = mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  nome: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: false,
  },
  preco: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("produtos", produtosSchema);

