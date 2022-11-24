//Dependencias
const { default: mongoose } = require("mongoose");

// Schema
const pokemonSchema = mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        defaut: mongoose.Types.ObjectId
    },
    pokemonName: {
        type: String,
        required: true
    },
    pokemonType: {
        type: String,
        required: true
    },
    pokemonImgURI: {
        type: String,
        required: false
    },
    pokemonTrainerOt: {
        type: String,
        required: false
    }
    //type: new Array(2),
});

module.exports = mongoose.model("pokemon", pokemonSchema);