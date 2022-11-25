const Biblioteca = require("../models/BibliotecaModel")

const buscarBibliotecas = async(req, res) => {
    try {
        const bibliotecas = await Biblioteca.find({})

        return res.status(200).json({
            bibliotecas: bibliotecas,
            message: "Bibliotecas cadastradas"
        })
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const buscarBibliotecaPorId = async(req, res) => {
    try {
        const bibliotecas = await Biblioteca.findById(req.params.id)

        return res.status(200).json({bibliotecas})
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const criarBiblioteca = async(req, res) => {
    const {
        nome, 
        cnpj,
        telefone,
        iniciativaPrivada,
        endereco,
        cep,
        rua,
        numero,
        complemento,
        referencia,
        estado,
        cidade,
        bairro,
        bairrosQueAtuam,
        site,
        atividadesDisponiveis,
        pessoaResponsavel
    } = req.body;

    try {
        const biblioteca = new Biblioteca({
            nome: nome,
            cnpj: cnpj,
            telefone: telefone,
            iniciativaPrivada: iniciativaPrivada,
            endereco: endereco,
            cep: cep,
            rua: rua,
            numero: numero,
            complemento: complemento,
            referencia: referencia,
            estado: estado,
            cidade: cidade,
            bairro: bairro,
            bairrosAtuantes: bairrosQueAtuam,
            site: site,
            atividadesDisponiveis: atividadesDisponiveis,
            pessoaResponsavel: pessoaResponsavel
        })

        const bibliotecaCriada = await biblioteca.save();

        res.status(201).json({
            biblioteca: bibliotecaCriada
        })
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deletarBiblioteca = (req ,res) => {
    try {
        const bibliotecaDeletada = Biblioteca.findOneAndDelete(req.params.id)

        res.status(200).json({
            biblioteca: bibliotecaDeletada,
            message: "Biblioteca deletada com sucesso"
        })
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const atualizarBiblioteca = (req, res) => {
    try {
        const bibliotecaAtualizada = Biblioteca.findByIdAndUpdate(req.params.id)

        res.status(200).json({bibliotecaAtualizada})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    buscarBibliotecas,
    buscarBibliotecaPorId,
    criarBiblioteca,
    deletarBiblioteca,
    atualizarBiblioteca
}

