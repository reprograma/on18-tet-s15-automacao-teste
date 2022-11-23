const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
//importa dependências e SECRET

const login = (req, res) =>{
    try {
        UserSchema.findOne({email: req.body.email}, (error, user) =>{
            //localiza o usuário no BD pelo email informado
            console.log("Usuário encontrado: ", user)
            if (!user){
                return res.status(404).send({
                    message: "Usuário não encontrado",
                    email: req.body.email
                })
                //retorna erro se não encontrar
            }
            const validPassword = bcrypt.compareSync(req.body.password, user.password)
            //compara senha informada com a no cadastro
            console.log("Senha válida?: ", validPassword)
            if (!validPassword){
                return res(401).send({
                    message: "Senha inválida",
                    statusCode: 401
                })
            }
            //returna erro se não bater
            const token = jwt.sign({name: user.name},SECRET)
            console.log("Token: ", token)
            //gera token con informações encontradas+secret

            res.status(200).send({
                message: "Usuário logado com sucesso",
                token
            })
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    login
}