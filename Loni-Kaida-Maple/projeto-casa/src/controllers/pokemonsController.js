// Dependencias
const PokemonModels = require("../models/pokemonsModels");
const bcrypt = require("bcrypt");
const pokemonsModels = require("../models/pokemonsModels");

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

// encontra por id//
const findById = async(req, res) => {
    const id = req.params.id;

    try {
        const findPokemon = await pokemonsModels.findById(id);

        if(!findPokemon) return res.status(404).json({
            statusCode: 404,
            message: `Pokemon ${id} not found`
        })
        res.status(200).json(findPokemon);
    } 
    catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const filterByTrainerName = async(req, res) => {
    const oT = req.querry.pokemonTrainerOt;

    try {
        const findPokemon = await pokemonsModels.find(oT);

        if(!findPokemon) return res.status(404).json({
            statusCode: 404,
            message: `Pokemon com treinador ${oT} não encontrado!`
        })
        res.status(200).json(findPokemon);
    } 
    catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

//solta o pokemon "Deleta ele hehe"//
const release = async(req, res) => {
    const id = req.params;

   try {
    const findPokemon = await pokemonsModels.findById(id);

    if(!findPokemon) return res.status(404).json({
        statusCode: 404,
        message: `Pokemon ${id} not found`
    })

    await findPokemon.delete();

    return re.status(200).json({
        statusCode: 200,
        message: `Pokemon ${id} solto na naturesa "Dletado!" OwO`
    });
    
   } catch (error) {
    res.status(500).json({
        statusCode: 500,
        message: error.message
    })
    }
}

module.exports = {
    all,
    create,
    findById,
    filterByTrainerName,
    release

}