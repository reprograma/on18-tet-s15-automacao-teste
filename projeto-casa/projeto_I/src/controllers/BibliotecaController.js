const bibliotecaSchema = require("../models/BibliotecaModel")

const criarBiblioteca = async(req, res) =>{
    try {
        const biblioteca = new bibliotecaSchema({
            nome: req.body.nome,
            cnpj: req.body.cnpj,
            telefone: req.body.telefone,
            isIniciativaPrivada: req.body.isIniciativaPrivada,
            endereco: req.body.endereco,
            bairros: req.body.bairros,
            site: req.body.site,
            atividades_disponiveis: req.body.atividades_disponiveis,
            pessoa_responsavel: req.body.pessoa_responsavel

        })
        console.log(biblioteca)

        const salvarBibliotecas = await biblioteca.save()
         res.status(201).json({
            biblioteca: salvarBibliotecas
         })
         

    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        
    })
}
}

const buscarBiblioteca = async(req, res)=> {
    try {
        const biblioteca = await bibliotecaSchema.find()
                
         res.status(200).send(biblioteca)
         console.log(biblioteca)
    } catch (error) {
        res.status(400).json({
            mensagem: "biblioteca não encontrada",
    })
}
}

const buscaBibliotecaPorId = async(req, res)=>{
    try {
        
        const bibliotecaEncontrada = await bibliotecaSchema.findById(req.params.id)
         
          if (bibliotecaEncontrada == undefined){
            return res.status(404).send({menssage: "Biblioteca não encontrada"})
        }

        res.status(200).send(bibliotecaEncontrada)
                     
    } catch (error) {
        res.status(500).send({message:"erro"})        
    }

}

const deletarBibliotecaPorId = async(req, res)=>{
    try {
        
        const bibliotecaEncontrada = await bibliotecaSchema.findById(req.params.id)
                  
          if (bibliotecaEncontrada == undefined){
            return res.status(404).send({menssagem: "Biblioteca não encontrada"})
        }
       
        await bibliotecaEncontrada.delete()
        res.status(200).json({mensagem: `biblioteca removida do sistema.`})
                     
    } catch (error) {
        res.status(400).json({message:"erro"})        
    }

}

const atualizarBiblioteca = async(req, res)=>{
    try {
        const {nome, telefone, cnpj, isIniciativaPrivada, 
            endereco, bairros, site, 
            atividades_disponiveis, pessoa_responsavel
        } = req.body 


        let bibliotecas = await bibliotecaSchema.findById(req.params.id)

        bibliotecas.nome = nome || bibliotecas.nome
        bibliotecas,telefone = telefone || bibliotecas.telefone
        bibliotecas.cnpj = cnpj || bibliotecas.cnpj
        bibliotecas.isIniciativaPrivada = isIniciativaPrivada || bibliotecas.isIniciativaPrivada
        bibliotecas.endereco = endereco || bibliotecas.endereco
        bibliotecas.bairros = bairros || bibliotecas.bairros
        bibliotecas.site = site || bibliotecas.site
        bibliotecas.atividades_disponiveis = atividades_disponiveis || bibliotecas.atividades_disponiveis
        bibliotecas.pessoa_responsavel = pessoa_responsavel || bibliotecas.pessoa_responsavel

        const bibliotecaAtualizada = bibliotecas.save()

        
        res.status(200).json(bibliotecaAtualizada)
                    

    } catch (error) {
        res.status(400).json({message:"erro"}) 
    }
}


module.exports = {
    criarBiblioteca,
    buscarBiblioteca,
    buscaBibliotecaPorId,
    deletarBibliotecaPorId,
    atualizarBiblioteca 

     
} 