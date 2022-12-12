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
           if(biblioteca.length == 0) {
            return res.status(404).send({
                menssage: "nenhuma biblioteca cadrastrada"
            })
           }    
         
         res.status(200).send({
            menssage: "biblioteca encontrada",
            biblioteca: biblioteca
         })
         console.log(biblioteca)
    } catch (error) {
        res.status(400).json({
            message: error.message
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
        response.status(500).json({
          message: error.message,
        });
      }
    };



const deletarBibliotecaPorId = async(req, res)=>{
    try {
        
        const bibliotecaEncontrada = await bibliotecaSchema.findById(req.params.id)
                  
          if (bibliotecaEncontrada == undefined){
            return res.status(404).send({menssagem: "Biblioteca não encontrada"})
        }
       
        await bibliotecaEncontrada.delete()
        res.status(200).json({mensagem: `biblioteca removida do sistema.`})
                     
    } catch (error) {
        response.status(500).json({
          message: error.message,
        });
      }
    };




    const atualizarBiblioteca = async (req, res) => {
        const {_id} = req.params
        const { nome, telefone, endereco,  cnpj, isIniciativaPrivada, 
             bairros, site, 
            atividades_disponiveis, pessoa_responsavel } =
          req.body;
        try {
          const bibliotecaAtualizado = await bibliotecaSchema.find(_id) 
          .updateOne({
            nome, telefone,  cnpj, isIniciativaPrivada, 
            endereco, bairros, site, 
            atividades_disponiveis, pessoa_responsavel
          });
      
          const bibliotecaUpdate= await bibliotecaSchema.find(_id) 
          console.log(bibliotecaUpdate)
          if (bibliotecaUpdate.length == 0) {
            return res.status(404).json({
              message: `A biblioteca não foi encontrada.`
            });
          }
          res.status(200).send({ 
            message:"Biblioteca atualizada com sucesso",
            bibliotecaUpdate });
        } catch (error) {
          res.status(500).json({
            message: error.message,
          });
        }
      };


module.exports = {
    criarBiblioteca,
    buscarBiblioteca,
    buscaBibliotecaPorId,
    deletarBibliotecaPorId,
    atualizarBiblioteca 

     
} 