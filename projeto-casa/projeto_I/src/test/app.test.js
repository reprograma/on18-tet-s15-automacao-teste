const app = require('../app')
const request = require("supertest")
const model = require("../models/BibliotecaModel")

describe("Biblioteca Controller", ()=>{
    
    const bibliotecaMock = {
        Nome: "Ler ",
        cnpj : "097897",
	telefone: "76988",
	isIniciativaPrivada: true,
	endereco: "Sanpa",
	bairros :"Vila Marta",
	site : "www.test.BB",
	atividades_disponiveis : "leitura e escrever",
	pessoa_responsavel : "CD"

    }
 
 beforeAll(async ()=>{
    const newBiblioteca = new model(bibliotecaMock)
    await newBiblioteca.save()
    bibliotecaMock.id = newBiblioteca._id
 })
 afterAll(async () => {
    await model.deleteMany() // deletar muitos
  })


 /*test('GET /biblioteca/buscar', (done)=>{
    request(app)
    .get("/biblioteca/buscar")
    .expect(200)
    .expect(res =>{
         expect(res.body.bibliotecaMock.length).toBe(1)
        
    })
    .end(err => done(err))
 })*/

test("POST /biblioteca", () =>{

    const bibliotecaBody = {
        Nome: "Ler e escrever",
        cnpj : "097738556",
	telefone: "769887653",
	isIniciativaPrivada: true,
	endereco: "saj",
	bairros :"salgadeira",
	site : "www.test.biblioteca",
	atividades_disponiveis : "leitura",
	pessoa_responsavel : "eu"
 }
 request(app)
 .post("/biblioteca")
 .send(bibliotecaBody)
 .expect(201)
 .expect(res => {
    expect(res.body.bibioteca.Nome).toBe("Ler e escrever")

 })
 .end(err =>{
    return done(err)
  })

 })

 test("GET /biblioteca/:id", (done) =>{
    request(app)
    .get(`/biblioteca/ ${bibliotecaMock.id}`)
    .expect(200)
    .end((err) => done(err))

 })

 test("DELETE /biblioteca/:id ", (done) => {
    request(app)
    .delete(`/biblioteca/${bibliotecaMock.id}`)
    .expect(200)
    .end(err => done(err))
 })

})

