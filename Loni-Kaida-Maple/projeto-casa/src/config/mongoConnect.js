//Dependencias
const mongoose = require("mongoose");

//Conecta ao mongo DB
const connect = async () => {
    return mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("✪ ω ✪ Nya Mongo Connected!");
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
}

//exporta a função connect
module.exports = {
    connect
};