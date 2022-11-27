/*const mongoose = require("mongoose");*/

const PacienteSchema = require("../models/PacienteSchema");

const criarPaciente = async( request, response) =>{
    const {nome,telefone,endereco,plano_saude,plano_saude_numero}= request.body
   
    try{
        const paciente = new PacienteSchema({
        nome: nome,
        telefone: telefone,
        endereco: endereco,
        plano_saude: plano_saude,
        plano_saude_numero: plano_saude_numero,
        
        })
     
    const salvarPaciente = await paciente.save();
    response.status(201).json({
        paciente: salvarPaciente
     })

    }catch(error){
        response.status(400).json({
            message: error.message
        })
    }
}


const buscarPaciente = async(request,response) =>{
    const { nome } = request.query
    
    let query = {}
if (nome) query.nome = new RegExp(nome,'i')

    try {
        const paciente= await PacienteSchema.find(query)
        response.status(200).json({
        
            message: "Pacientes carregados com sucesso!",
            paciente})
    
    } catch (error) {
       response.status(500).json({
        message: error.message
       }) 
    }
}

const buscarPacientePorId = async (request, response) => {
    const { id } = request.params
    try {
        const pacienteId = await PacienteSchema.find({id})
        response.status(200).json(pacienteId);

    } catch (error) {
        response.status(500).json({
            mensagem: error.message
        })
    }
}

const deletarPaciente = async(req, res) =>{
    try{
        const paciente = await PacienteSchema.findById(req.params.id)

        await paciente.delete();

        res.status(200).json({
            message: "Paciente removido com sucesso!"
        })
    
    }catch(error){
        res.status(400).json({
            mensagem: error.message
        })
    }
}


module.exports = {
    criarPaciente,
    buscarPaciente,
    buscarPacientePorId,
    deletarPaciente
    

}