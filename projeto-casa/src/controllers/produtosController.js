const ProdutosModels = require("../models/produtosModels");
const bcrypt = require("bcrypt");
const SALT = 10;

const all = async (req, res) => {
  try {
    const allProdutos = await ProdutosModels.find();
    res.status(200).json({
      statusCode: 200,
      message: "Produtos carregados com sucesso:",
      produtos: allProdutos,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const findProdutos = await ProdutosModels.findById(id);

    if (!findProdutos)
      return res.status(404).json({
        statusCode: 404,
        message: `Produto: ${id} não encontrado.`,
      });
    res.status(200).json(findProdutos);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const create = async (req, res) => {
  const { nome, marca, descricao, categoria, preco } = req.body;

  if (!nome) {
    return res.status(400).json({
      statusCode: 400,
      message: `Nome é obrigátório`,
    });
  }

  if (!marca) {
    res.status(400).json({
      statusCode: 400,
      message: `Marca é obrigatório`,
    });
  }

  try {
    const newProdutos = new ProdutosModels({
      nome,
      marca,
      descricao,
      categoria,
      preco,
    });

    newProdutos.marca = bcrypt.hashSync(marca, SALT);

    const savedProdutos = await newProdutos.save();

    return res.status(201).json({
      statusCode: 201,
      message: `Produto criado com sucesso!`,
      produtos: savedProdutos,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  const { nome, marca, descricao, categoria, preco } = req.body;
  const id = req.params.id;
  try {
    const findProdutos = await ProdutosModels.findById(id);

    if (!findProdutos)
      return res.status(404).json({
        statusCode: 404,
        message: `Produto ${id} não encontrado.`,
      });

    // findProdutos.nome = nome && bcrypt.hashSync(nome, SALT) || findProdutos.nome
    findProdutos.nome = nome || nome.nome;
    findProdutos.marca = marca || marca.marca;
    findProdutos.descricao = descricao || findProdutos.descricao;
    findProdutos.categoria = categoria || findProdutos.categoria;
    findProdutos.preco = preco || findProdutos.preco;

    const updatedProdutos = await findProdutos.save();

    return res.status(200).json({
      statusCode: 200,
      message: `Produto atualizado!`,
      produtos: updatedProdutos,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const findProdutos = await ProdutosModels.findById(id);

    if (!findProdutos)
      return res.status(404).json({
        statusCode: 404,
        message: `Produto ${id} não encontrado.`,
      });

    await findProdutos.delete();

    return res.status(200).json({
      statusCode: 200,
      message: `Produto deletado com sucesso.`,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = { all, findOne, create, update, remove };
