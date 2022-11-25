const app = require('../app')
const request = require("supertest")
const model = require("../models/pacientesModels")

describe('Paciente Controllers', () => {  
  const pacienteMock = {
    nome: "Ana",
    telefone: "988905467",
    cidade: "Recife",
    plano_saude: "Solar",
    plano_saude_numero: "0987654423"
}
beforeAll(async () => {
  const newPaciente = new model(pacienteMock)
  await newPaciente.save()

  pacienteMock.id = newPaciente._id
})

  test("GET /pacientes/all ", (done) => {
    request(app)
    .get("/pacientes/all")
    .expect(200)
    .expect(res => {
      expect(res.body.statusCode).toBe(200)
    })
    .expect(res => {
      expect(res.body.message).toBe('Pacientes carregados com Sucesso!')
    })
    .end(err => {
      return done(err)
   })
 })
  test("POST /pacientes/create", (done) => {
    const pacientesBody = {
      nome: "Julia",
      telefone: "998704678",
      cidade: "Olinda",
      plano_saude: "Help",
      plano_saude_numero: "0987364538"
    }  
    request(app)
    .post("/pacientes/create")
    .send(pacientesBody)
    .expect(201)
    .expect(res =>{
      expect(res.body.statusCode).toBe(201)
  })
    .expect(res =>{
        expect(res.body.message).toBe('Paciente criado (a) com sucesso')
    })
    .end(err => {
        return done(err)
    })
})
test("PUT /pacientes/update/:id", (done) => {
  const pacientesBody = {
      nome: "maria paula",
      plano_saude: "plano atulizado"
      
  }
  request(app)
  .put("/pacientes/update/" + pacientesMock.id)
  .send(pacientesBody)
  .expect(200)
  .expect(res =>{
      expect(res.body.pacientes.nome).toBe("maria paula")
      expect(res.body.pacientes.plano_saude).toBe("plano atualizado")
  })
  .end(err => done(err))
    })    
  })
