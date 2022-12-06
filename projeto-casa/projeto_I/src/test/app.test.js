const app = require("../app")
const request = require("supertest")
const model = require("../models/BibliotecaModel")
const jwt = require('jsonwebtoken');
const SECRET= process.env.SECRET

describe('Biblioteca Controller', () => {

  const token="bearer "+jwt.sign({ name:"Leinane" }, SECRET)
  
  const bibliotecaMock = {
   nome: "le",
   cnpj:"45",
   telefone: "8",
   isIniciativaPrivada: false,
   endereco: {
cep: "41600110",
rua: "Rua das Meninas",
numero: "56",
complemento: "predio",
referencia: "Ao lado do Atacadao",
estado: "Bahia",
cidade: "Salvador",
bairro:"Mata Exura"},
bairros_atuantes: ["A"],
site: "bco",
atividades_disponiveis:["dsn"],
pessoa_responsavel: "eu"
  }

  beforeAll(async () => {
    const newbiblioteca = new model(bibliotecaMock)
    await newbiblioteca.save()

    bibliotecaMock.id =newbiblioteca._id
  })

//testa quantos pacientes existem 200 ok
  test('Deve retornar todas as bibliotecas, status(200)', (done) => {
   req(app)
     .get("/biblioteca/buscar")
     .set("authorization", token)
     .expect(200)
     .expect(res => {
        expect(res.body.menssage).toBe("biblioteca encontrada")
       
     })
     .end(err => {
        if (err) return done(err)
        return done()
     })
  })
});