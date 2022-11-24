const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

exports.checkAuth = (req,res,next) => {
    const authHeader = req.get('authorization')
    if (!authHeader){
        return res.status(401).send({
            message: 'Operação não autorizada',
            statusCode: 401
        })
    }
    const token = authHeader.split(' ')[1]
    console.log('token gerado: ', token)

    if (!token){
        return res.status(401).send({ message: 'Erro na geração do token'})
    }
    try {
        jwt.verify(token, SECRET, (error)=>{
            if (error){
                return res.status(401).send({
                    mensagem: 'Não autorizado'
                })
            }
            next()
        })
    } catch (error) {
        console.error(error)
    }
}