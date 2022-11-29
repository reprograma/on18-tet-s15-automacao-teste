const mongoose = require('mongoose');
const bibliotecaSchema = require("../models/BibliotecaSchema");
const bcrypt = require('bcrypt');
const BibliotecaSchema = require('../models/BibliotecaSchema');
const SALT = 10;

const criarBiblioteca = async(require, res) => {
    const {nome, cnpj, telefone, iniciativa_privada, endereco, bairros_atuantes,site,atividades_disponiveis, responsavel} = require.body;
    try{
        const biblioteca = new bibliotecaSchema({
            nome: nome,
            cnpj: cnpj,
            telefone: telefone,
            iniciativa_privada: iniciativa_privada,
            endereco: endereco,
            bairros_atuantes: bairros_atuantes,
            site:site,
            atividades_disponiveis: atividades_disponiveis,
            responsavel:responsavel
        })
        
        const novaBiblioteca = await biblioteca.save();
        res.status(201).json({
            biblioteca: novaBiblioteca
            
        })

       } catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}

const all = async(req, res) => {
    try {
      const allBiblioteca = await BibliotecaSchema.find()
          res.status(200).json({
            statusCode: 200,
            message: "Exibindo todas as bibliotecas com sucesso!",
            Biblioteca: allBiblioteca
          })
        } catch (error) {
          res.status(500).json({ 
            statusCode: 500,
            message: error.message 
          })
        }
    }


const obterBibliotecaPorId = async (req, res) => {
    try {
        const biblioteca = await BibliotecaSchema.findById(req.params.id)

        return res.status(200).json({
            statusCode:200,
            message:"Biblioteca encontrada",
            Biblioteca: biblioteca
        })
    
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const atualizarBiblioteca = async (request, res) => {
    const { id } = request.params
   
    const {nome, cnpj, telefone, iniciativa_privada, endereco:{cep, rua, numero, complemento, referencia, estado, cidade, bairro },
    bairros_atuantes,site,atividades_disponiveis, responsavel} = request.body;
    
    try{
        if(id.length > 24 || id.length > 24) {
            res.status(404).json({
                message:`Número de ID incorreto, por favor, digite novamente!`
            })
        }

        if (String(cnpj).length > 14 || String(cnpj).length < 14){
            res.status(404).json({
                message:`cnpj inválido, digite novamente.`
            })
        }

        const bibliotecaEncontrada = await bibliotecaSchema.updateOne({ 
            nome, cnpj,telefone, iniciativa_privada, 
            endereco: {cep, rua,numero, complemento, referencia, estado, cidade, bairro},
            bairros_atuantes, site, atividades_disponiveis, responsavel
        })
        const bibliotecaAtualizado = await bibliotecaSchema.find({ id })
            if(bibliotecaAtualizado.length == 0 ) {
                res.status(404).json({
                    message:`Biblioteca não encontrada!`
                })
            }
     
        res.status(200).json({
            Biblioteca: bibliotecaAtualizado,
            message:"Biblioteca atualizada com sucesso!"
        })

   } catch (err){
        res.status(400).json({
            message: err.message
      })
   }
}

const deletarBiblioteca = async(req, res) =>{
    try{
        const biblioteca = await bibliotecaSchema.findOneAndDelete(req.params.id)

        await biblioteca.delete();

        res.status(200).json({
            message: "Biblioteca removida do banco de dados."
        })
    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}


module.exports = {
    criarBiblioteca,
    all,
    obterBibliotecaPorId,
    atualizarBiblioteca,
    deletarBiblioteca
}