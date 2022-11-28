const mongoose = require('mongoose')
//const MONGODB_URI='process.env.MONGODB_URI'

const connect = async() =>{

    try {
        await mongoose.connect( process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true


        })
        console.log("Banco de dados conectadooooo")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    connect
}

