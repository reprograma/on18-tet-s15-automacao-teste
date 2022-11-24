// Dependencias
const PokemonModels = require("../models/pokemonsModels");
const bcrypt = require("bcrypt");

//----------------------------------------//

// Exibir todos os pokemons//
const all = async(req, res) => {
    try {
        const allPkm = await PokemonModels.find();
        res.status(200).json({
            statusCode: 200,
            message: "os pokemons carregados com sucesso!",
            pokemons: allPkm
        })
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

// Criar novos Pokemons no banco de dados//
const create = async(req, res) => {
    //Campos nesessarios//
    const { pokemonName, pokemonType, pokemonImgURI, pokemonTrainerOt } = req.body;
    //--------------------------//

    //Checa os campos obrigatórios//
    if(!pokemonName){
        return res.status(400).json({
            statusCode: 400,
            message: "pokemonName é obrigatorionya!"
        });
    }

    if(!pokemonType){
        return res.status(400).json({
            statusCode: 400,
            message: "pokemonType é obrigatorionya!"
        });
    }

    // Faz a patifaria acontecer//
    try {
        const newPkm = new PokemonModels({ pokemonName, pokemonType, pokemonImgURI, pokemonTrainerOt});
        const savedPkm = await newPkm.save();
        //Manda o status code//
        return res.status(201).json({
            statusCode: 201,
            message: "Pokemon criado com sucessonya!",
            colaboradora: savedPkm
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

module.exports = {
    all,
    create
}