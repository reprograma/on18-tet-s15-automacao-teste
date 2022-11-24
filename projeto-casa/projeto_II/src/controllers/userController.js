const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')

const createUser = async(req,res)=>{
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    //converte senha em hash e grava novo valor sobre o anterior
    const emailExists = await UserSchema.exists({email: req.body.email})
    //checa se email existe no cadastro
    if (emailExists){
        return res.status(409).send({
            message: 'Email já cadastrado'
        })
    }
    //erro caso já tenha email no cadastro
    try {
        const newUser = new UserSchema(req.body)
        const savedUser = await newUser.save()
        //salva novo usuário
        res.status(201).send({
            message: 'Usuário criado com sucesso',
            savedUser
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    createUser
}