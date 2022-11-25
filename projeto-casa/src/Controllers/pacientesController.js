const pacientesModels = require("../models/pacientesModels")
const bcrypt = require ('bcrypt')
const SALT = 10


const all = async(req, res) => {
    try {
      const allPacientes = await pacientesModels.find()
      res.status(200).json({
        statusCode: 200,
        message: 'Pacientes carregados com Sucesso!',
        // pacientes: allPacientes
      })
    } catch (error) {
      res.status(500).json({ 
        statusCode: 500,
        message: error.message 
      })
    }
  }

  const findOne = async (req, res) => {
    const id = req.params.id
    try {
      const findPaciente = await pacientesModels.findById(id)
  
      if (!findPaciente) return res.status(404).json({
        statusCode: 404,
        message: `Paciente ${id} Não encntrado`
      })
      res.status(200).json(findPaciente)
    } catch (error) {
      res.status(500).json({ 
        statusCode: 500,
        message: error.message 
      })
    }
  } 
  
  const create = async(req, res) => {
    const { nome, telefone, cidade, plano_saude, plano_saude_numero } = req.body
    
    if (!nome) {
     return res.status(400).json({ 
       statusCode: 400,
       message: `Nome é obrigátório`
      })
    }
    if (!plano_saude) {
     res.status(400).json({
       statusCode: 400,
       message: `Plano Saúde é obrigatório`
     })
    }
 
    try {
     const newPaciente = new pacientesModels({ nome,telefone, cidade, plano_saude, plano_saude_numero})
 
     newPaciente.plano_saude = bcrypt.hashSync(plano_saude, SALT)
 
     const savedPaciente = await newPaciente.save()
 
     return res.status(201).json({
       statusCode: 201,
       message: `Paciente criado(a) com sucesso`,
      //  paciente: savedPaciente
     })
    } catch (error) {
      res.status(500).json({
       statusCode: 500,
       message: error.message
     })
    }
 }
 
  module.exports = {
     all,
     findOne,
     create
 }