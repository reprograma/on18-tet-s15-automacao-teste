const app = require('../app')
const request = require('supertest')
const model = require ('../models/CozinhaModel')
const { get } = require('mongoose')

describe('Cozinha Controller', () => {
    const cozinhaMock ={
        nome: "Cozinha Teste",
        cnpj: 123456789101122,        
        iniciativa_privada:false,
        endereco:{
            cep: 'cepteste',
            rua: 'rua teste',
            numero: 'numeroteste',
            estado: 'estadoteste',
            cidade: 'cidadeteste',
            bairro: 'bairroteste'
            },
        bairros_atuantes:'bairrosteste',
        atividades_disponiveis:'ativteste',
        pessoa_responsavel:'responsteste'
    }
    beforeAll(async()=>{
        const newCozinha = new model(cozinhaMock)
        await newCozinha.save()
        cozinhaMock.id = newCozinha._id
    })
test('GET /cozinha/exibir', (done) => {
    request (app)
    .get('/cozinha/exibir')
    .expect(200)
    .expect(res =>{
        expect(res.body.message).toBe('Exibindo todas as cozinhas')
    })
    .end(err=>{
        if (err) return done(err)
        return done()
    })
}) 
test('GET /cozinha/:id', (done)=>{
    request (app)
    .get('/cozinha/' + cozinhaMock.id)
    .expect(200)
    .expect(res =>{
        expect(res.body.message).toBe('Cozinha encontrada')
    })
    .end(err=>{
        if (err) return done(err)
        return done()
    })
})
test ('POST /cozinha/cadastrar', (done)=>{
    const cozinhaBody ={
    nome: "Cozinha Nova3",
    cnpj: 123456789101164,        
    iniciativa_privada:false,
    endereco:{
        cep: 'cepteste3',
        rua: 'rua teste3',
        numero: 'numeroteste3',
        estado: 'estadoteste3',
        cidade: 'cidadeteste3',
        bairro: 'bairroteste3'
        },
    bairros_atuantes:'bairrosteste3',
    atividades_disponiveis:'ativteste3',
    pessoa_responsavel:'responsteste3'
    }
    request(app)
    .post('/cozinha/cadastrar/')
    .send(cozinhaBody)
    .expect(201)
    .expect(res=>{
        expect(res.body.message).toBe('Cozinha cadastrada com sucesso')
    })
    .end(err=>{
        if(err) return done(err)
        return done()
    })
})
test('PATCH /cozinha/atualizar/:id', (done)=>{
    const cozinhaBody2 ={
        nome: "Cozinha Atualizada",
        cnpj: 123456789101163,        
        iniciativa_privada:false,
        endereco:{
            cep: 'cepteste4',
            rua: 'rua teste4',
            numero: 'numeroteste4',
            estado: 'estadoteste4',
            cidade: 'cidadeteste4',
            bairro: 'bairroteste4'
            },
        bairros_atuantes:'bairrosteste4',
        atividades_disponiveis:'ativteste4',
        pessoa_responsavel:'responsteste4'
        }
        request(app)
        .patch('/cozinha/atualizar/' + cozinhaMock.id)
        .send(cozinhaBody2)
        .expect(200)
        .expect(res=>{
            expect(res.body.message).toBe('Cozinha atualizada com sucesso')
        })
        .end(err=>{
            if(err) return done(err)
            return done()
        })
})

test('DELETE /cozinha/deletar/:id', (done)=>{
    request(app)
    .delete('/cozinha/deletar/' + cozinhaMock.id)
    .expect(200)
    .expect(res=>{
        expect(res.body.message).toBe('Cozinha apagada com sucesso')
    })
    .end(err=>{
        if (err) return done(err)
        return done()
    })
})
})