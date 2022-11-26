const mongoose = require("mongoose");
const BibliotecaSchema = require("../models/BibliotecaSchema");
const bcrypt = require("bcrypt");


const criarBiblioteca = async(requisicao, resposta) => {
  const { nome, cnpj, telefone, iniciativa_privada,
      endereco: { cep, rua, numero, complemento, referencia, estado, cidade, bairro },
      bairros_atuantes, site, atividades_disponiveis, responsavel } = requisicao.body;

  try{

      //Regras de negócio: Não poderá existir bibliotecas com o mesmo cnpj
      const buscarCnpj = await BibliotecaSchema.find({ cnpj })

      if (buscarCnpj.length !== 0) {
          return resposta.status(400).json({ Prezados: `Este número de CNPJ já existe no nosso banco de dados` });
      }

      //Regras de negócio: Não aceitará CNPJ com menos de 14 caracteres
      if(String(cnpj).length > 14 || String(cnpj).length < 14){
          resposta.status(400).json({
              message:`CNPJ deve ter 14 caracteres.`
          })
      }

      //Regras de negócio: Não poderá existir cozinhas com o mesmo nome no mesmo bairro
      const buscaBairro = await BibliotecaSchema.find({ bairro })
      let existeBairro = buscaBairro.filter((biblioteca) => biblioteca.endereco.bairro === bairro)
      let nomeExisteBairro = existeBairro.find((biblioteca) => biblioteca.nome === nome)
      if (nomeExisteBairro) {
          return resposta.status(400).json({ Prezados: `O nome desta biblioteca já existe neste bairro` });
      }

      const biblioteca = new BibliotecaSchema({
          nome: nome,
          cnpj: cnpj,
          telefone: telefone,
          iniciativa_privada: iniciativa_privada,
          endereco: {
              cep: cep,
              rua: rua,
              numero: numero,
              complemento: complemento,
              referencia: referencia,
              estado: estado,
              cidade: cidade,
              bairro: bairro
          },
          bairros_atuantes: bairros_atuantes,
          site: site,
          atividades_disponiveis: atividades_disponiveis,
          responsavel: responsavel
      })

      const salvarBiblioteca = await biblioteca.save();
      resposta.status(201).json({
        statusCode: 201,
          message: "Biblioteca cadastrada com sucesso!",
          biblioteca: salvarBiblioteca
      })

  }catch(error){
      resposta.status(400).json({
          message: error.message
      })
  }
}


const buscarBibliotecas = async(req, res) => {
    try {
      const allBibliotecas = await BibliotecaSchema.find()
      res.status(200).json({
        statusCode: 200,
        message: 'Bibliotecas carregadas com sucesso!',
        biblioteca: allBibliotecas
      })
    } catch (error) {
      res.status(500).json({ 
        statusCode: 500,
        message: error.message 
      })
    }
  }

  // Ou: 

  // const buscarTodasBibliotecas = async (request, response) => {
  //     try {
  
  //         const biblioteca = await BibliotecaSchema.find()
  
  // if (biblioteca.length > 1) {
  //     return response.status(200).json({ Prezados: `Encontramos ${biblioteca.length} bibliotecas.`, biblioteca })
  // } else if (biblioteca.length == 1) {
  //     return response.status(200).json({ Prezados: `Encontramos ${biblioteca.length} biblioteca.`, biblioteca })
  // } else {
  //     return response.status(404).json({ Prezados: `Nenhuma biblioteca encontrada.` })
  // }
  
  //     } catch (error) {
  //         response.status(500).json({
  //             message: error.message
  //         })
  //     }
  // }
//}

const buscarBibliotecaPorId = async(req, res) => {
  try {
      const biblioteca = await BibliotecaSchema.findById(req.params.id)
      res.status(200).json(biblioteca);

  } catch (error)  {
      res.status(500).json({
          mensagem: error.message
      })
  }
}

const update = async(req, res) =>  {
    const {nome, cnpj, telefone, iniciativa_privada, endereco:{cep, rua, numero, complemento, referencia, estado, cidade, bairro },
    bairros_atuantes, site, atividades_disponiveis, responsavel}  = req.body
    
    const id = req.params.id
    try {
      const findBiblioteca = await BibliotecaSchema.findById(id)
  
      if (!findBiblioteca) return res.status(404).json({
        statusCode: 404,
        message: `Biblioteca ${id} not found`
      })
      
      findBiblioteca.nome = nome || findBiblioteca.nome
      findBiblioteca.endereco.cep = cep || findBiblioteca.endereco.cep
      findBiblioteca.endereco.rua = rua || findBiblioteca.endereco.rua
      findBiblioteca.endereco.numero = numero || findBiblioteca.endereco.numero
      findBiblioteca.endereco.complemento = complemento || findBiblioteca.endereco.complemento
      findBiblioteca.endereco.referencia = referencia || findBiblioteca.endereco.referencia
      findBiblioteca.endereco.estado = estado || findBiblioteca.endereco.estado
      findBiblioteca.endereco.cidade = cidade || findBiblioteca.endereco.cidade
      findBiblioteca.endereco.bairro = bairro || findBiblioteca.endereco.bairro
      findBiblioteca.bairros_atuantes = bairros_atuantes || findBiblioteca.bairros_atuantes
      findBiblioteca.site = site || findBiblioteca.site
      findBiblioteca.atividades_disponiveis = atividades_disponiveis || findBiblioteca.atividades_disponiveis
      findBiblioteca.responsavel = responsavel || findBiblioteca.responsavel

  
      const updatedBiblioteca = await findBiblioteca.save()
  
      return res.status(200).json({
        statusCode: 200,
        message: `Biblioteca atualizada com sucesso`,
        biblioteca: updatedBiblioteca
      })
  
     } catch (error) {
       res.status(500).json({
        statusCode: 500,
        message: error.message
      })
     }
  }

const atualizarBiblioteca = async (request, response) => {
  const { id } = request.params
 
  const {nome, cnpj, telefone, iniciativa_privada, endereco:{cep, rua, numero, complemento, referencia, estado, cidade, bairro },
  bairros_atuantes, site, atividades_disponiveis, responsavel} = request.body;
  
  try{
      if(id.length > 24 || id.length > 24) {
          response.status(404).json({
              message:`Número de ID incorreto, por favor, digite novamente!`
          })
      }

      if (String(cnpj).length > 14 || String(cnpj).length < 14){
          response.status(404).json({
              message:`CNPJ inválido, digite novamente.`
          })
      }

      const bibliotecaEncontrada = await BibliotecaSchema.updateOne({ 
          nome, cnpj,telefone, iniciativa_privada, 
          endereco: {cep, rua,numero, complemento, referencia, estado, cidade, bairro},
          bairros_atuantes, site, atividades_disponiveis, responsavel
      })

      const bibliotecaAtualizada = await BibliotecaSchema.findOneAndUpdate({ id })
          if(bibliotecaAtualizada.length == 0 ) {
              response.status(404).json({
                  message:`Biblioteca não encontrada!`,
                  biblioteca: bibliotecaEncontrada
              })
          }
          
      response.status(200).json({
        message: "Biblioteca atualizada com sucesso!",
        biblioteca: bibliotecaAtualizada
      })

 } catch (error){
      response.status(500).json({
          message: error.message
    })
 }
}


const deletarBiblioteca = async (req, res) => {

  try {
      const bibliotecas = await BibliotecaSchema.findByIdAndDelete(req.params.id)

      await bibliotecas.delete()

      res.status(200).send({ 
        message: "Biblioteca deletada com sucesso!",
        biblioteca: bibliotecas
    })

      //ou 
      /* const { id } = req.params

      const deletarPorId = await BibliotecaSchema.deleteOne({ id })

      res.status(200).json({ mensagem: "Biblioteca deletada com sucesso!"})
      */
     
  } catch (error) {
      res.status(500).send({ message: error })
  }
}



module.exports = {
  criarBiblioteca,
  buscarBibliotecas,
  buscarBibliotecaPorId,
  update,
  atualizarBiblioteca,
  deletarBiblioteca
}