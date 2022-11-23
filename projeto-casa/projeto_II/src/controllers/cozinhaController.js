//importar express, mongoose e schema do BD
const { response } = require('express')
const mongoose = require('mongoose')
const cozinhaSchema = require('../models/CozinhaModel')

const cadastrarCozinha = async(req,res)=>{
  //puxa dados do body para variavel
    const { nome, cnpj, iniciativa_privada, endereco, bairros_atuantes,
        site, atividades_disponiveis, pessoa_responsavel } = req.body
          try {
            //adiciona dados a um schema no modelo do BD
            const cozinha = new cozinhaSchema({
                nome: nome,
                cnpj: cnpj,
                iniciativa_privada: iniciativa_privada,
                endereco: endereco,
                bairros_atuantes: bairros_atuantes,
                site: site,
                atividades_disponiveis: atividades_disponiveis,
                pessoa_responsavel: pessoa_responsavel
            })
            //puxa todas as cozinhas do BD e compara os CNPJs, se forem iguais, retorna erro
            const cozinhaTodas = await cozinhaSchema.find()
            for (const contador in cozinhaTodas){
              if (cozinhaTodas[contador].cnpj == cozinha.cnpj) {
                return res.status(400).json({mensagem: "CNPJ já cadastrado"})
              }
            }
            //puxa nome e bairro do body e compara com dados já no BD, caso sejam os mesmos retorna erro
            cozinhaNomeBairro = {
              nome: nome,
              endereco: endereco}
            for (contador in cozinhaTodas){
            const cadastroNomeBairro = {
              nome: cozinhaTodas[contador].nome,
              endereco: cozinhaTodas[contador].endereco
            }
            if (cadastroNomeBairro.nome == cozinhaNomeBairro.nome && cadastroNomeBairro.endereco.bairro == cozinhaNomeBairro.endereco.bairro){
              return res.status(400).json({mensagem: "Erro: Cadastro com o mesmo nome no mesmo bairro encontrado"})
            }}
            //caso não haja erro, salva as informações no BD e exibe ao usuário
            const salvarCozinha = await cozinha.save()
            res.status(201).json({
                message: 'Cozinha cadastrada com sucesso',
                cozinha: salvarCozinha
            })
          } catch (error) {
            //excessão padrão para erro
            res.status(400).json({
                message: error.message
            })
          }
        }

const exibeCozinhas = async (req,res)=>{
  //cria uma request vazia
  let query = {}
  try {
    //busca todas as cozinhas no BD que correspondam a "", retorna todas
    const cozinhas = await cozinhaSchema.find(query)
    //exibe todos os resultados
    res.status(200).json({
      message: 'Exibindo todas as cozinhas',
      cozinhas: cozinhas})
  } catch (error) {
    res.status(500).json({
      mensagem: error.message
    })
  }
}

const buscarCozinhaPorId = async (req,res)=>{
  try {
    //puxa o ID via param e busca no BD todas as cozinhas correspondentes, exibe as mesmas
    const cozinhas = await cozinhaSchema.findById(req.params.id)
    res.status(200).json({
      message: 'Cozinha encontrada',
      cozinhas: cozinhas})
  } catch (error) {
    res.status(500).json({
      mensagem: error.message
    })
  }
}

const deletarCozinha = async (req,res)=>{
  try {
    //busca a cozinha correspondente ao id do param no BD
    const cozinha = await cozinhaSchema.findById(req.params.id)
    //deleta o resultado encontrado, exibe mensagem confirmando
    await cozinha.delete()
    res.status(200).json({
      message: "Cozinha apagada com sucesso"})
  } catch (error) {
    res.status(400).json({
      mensagem: error.message
    })
  }
}

const atualizarCozinha = async (req,res)=>{
  //busca a cozinha referente ao id do param no BD
  const cozinha = await cozinhaSchema.findById(req.params.id)
  //caso não encontre, retorna erro
  if (!cozinha){
    return res.status(404).send({
      mensagem: `Não foi encontrada nenhuma cozinha com o id ${req.params.id}`
    })
  }
  //caso encontre: puxa dados do body para atualização
  const { nome, cnpj, iniciativa_privada, endereco, bairros_atuantes,
    site, atividades_disponiveis, pessoa_responsavel } = req.body

    //erros referentes a campos obrigatórios e formato de dados
    if(typeof nome !="string"||nome.trim()==""){
      return res.status(400).send({
        mensagem: "O campo 'Nome' é obrigatório para cadastro"
      })
    }
    
    if(typeof cnpj !="number"){
      return res.status(400).send({
        mensagem: "O campo 'CNPJ' precisa ser um número"
      })
    }
    //este código servia para verificar se há CNPJ repetido e impedir alteração
    //porém a regra de negócio só se aplicava a novos cadastros, a presença deste
    //código quebra a função, pois o CNPJ sempre vai ser igual, pois
    //é um campo obrigatório para o Patch
    //bloco mantido como comentário para estudo/referência futura
    // const cozinhaTodas = await cozinhaSchema.find()
    // for (const contador in cozinhaTodas){
    //   if (cozinhaTodas[contador].cnpj == cnpj) {
    //     return res.status(400).json({mensagem: "CNPJ já cadastrado"})
    //   }
    // }
    if(typeof iniciativa_privada !="boolean"){
      return res.status(400).send({
        mensagem: "O campo 'Iniciativa Privada?' precisa ser True ou False"
      })
    }
    if(typeof bairros_atuantes[0]!="string"||bairros_atuantes[0].trim()==""){
      return res.status(400).send({
        mensagem: "O campo 'Bairros Atuantes' é obrigatório para cadastro"
      })
    }
    
    if(typeof endereco.cep !="string"||endereco.cep.trim()==""){
      return res.status(400).send({
        mensagem: "O campo 'Endereço (CEP)' é obrigatório para cadastro"
      })
    }

    if(typeof endereco.rua !="string"||endereco.rua.trim()==""){
      return res.status(400).send({
        mensagem: "O campo 'Endereço (Rua)' é obrigatório para cadastro"
      })
    }

    if(typeof endereco.numero !="string"||endereco.numero.trim()==""){
      return res.status(400).send({
        mensagem: "O campo 'Endereço(número)' é obrigatório para cadastro"
      })
    }

    if(typeof endereco.estado !="string"||endereco.estado.trim()==""){
      return res.status(400).send({
        mensagem: "O campo 'Endereço(Estado)' é obrigatório para cadastro"
      })
    }

    if(typeof endereco.cidade !="string"||endereco.cidade.trim()==""){
      return res.status(400).send({
        mensagem: "O campo 'Endereço(número)' é obrigatório para cadastro"
      })
    }
    
    if(typeof endereco.bairro !="string"||endereco.bairro.trim()==""){
      return res.status(400).send({
        mensagem: "O campo 'Endereço(Bairro)' é obrigatório para cadastro"
      })
    }

    if(typeof atividades_disponiveis[0] !="string"||atividades_disponiveis[0].trim()==""){
      return res.status(400).send({
        mensagem: "O campo 'Atividades Disponíveis' é obrigatório para cadastro"
      })
    }
    if(typeof pessoa_responsavel !="string"||pessoa_responsavel.trim()==""){
      return res.status(400).send({
        mensagem: "O campo 'Pessoa Responsável' é obrigatório para cadastro"
      })
    }
    //após checar as excessões, se tudo estiver ok, o bloco a seguir
    //insere as alterações requeridas do body no BD
    if (nome) cozinha.nome = nome
    if (cnpj) cozinha.cnpj = cnpj
    if (iniciativa_privada) cozinha.iniciativa_privada = iniciativa_privada
    if (endereco.cep) cozinha.endereco.cep = endereco.cep
    if (endereco.rua) cozinha.endereco.rua = endereco.rua
    if (endereco.numero) cozinha.endereco.numero = endereco.numero
    if (endereco.complemento) cozinha.endereco.complemento = endereco.complemento
    if (endereco.referencia) cozinha.endereco.referencia = endereco.referencia
    if (endereco.estado) cozinha.endereco.estado = endereco.estado
    if (endereco.cidade) cozinha.endereco.cidade = endereco.cidade
    if (endereco.bairro) cozinha.endereco.bairro = endereco.bairro
    if (bairros_atuantes[0]) cozinha.bairros_atuantes[0] = bairros_atuantes[0]
    if (site) cozinha.site = site
    if (atividades_disponiveis[0]) cozinha.atividades_disponiveis[0] = atividades_disponiveis[0]
    if (pessoa_responsavel) cozinha.pessoa_responsavel = pessoa_responsavel
    
    //assim com o bloco anterior, este código impediria alteração caso
    //nome e bairro fossem iguais, mas causa o mesmo problema pois são
    //campos obrigatórios e não se encaixa na regra de negócio
    //bloco mantido como comentário para estudo/referência futura
    // cozinhaNomeBairro = {
    //   nome: nome,
    //   endereco: endereco}
    // for (contador in cozinhaTodas){
    // const cadastroNomeBairro = {
    //   nome: cozinhaTodas[contador].nome,
    //   endereco: cozinhaTodas[contador].endereco
    // }
    // if (cadastroNomeBairro.nome == cozinhaNomeBairro.nome && cadastroNomeBairro.endereco.bairro == cozinhaNomeBairro.endereco.bairro){
    //   return res.status(400).json({mensagem: "Erro: Cadastro com o mesmo nome no mesmo bairro encontrado"})
    // }}

    //salva as alterações, exibe resultado
    const salvarCozinha = await cozinha.save()
    res.status(200).json({
      message: 'Cozinha atualizada com sucesso',
      cozinha: salvarCozinha})
}

//exporta funções para uso no resto do projeto
module.exports = {
    cadastrarCozinha,
    exibeCozinhas,
    buscarCozinhaPorId,
    deletarCozinha,
    atualizarCozinha
}