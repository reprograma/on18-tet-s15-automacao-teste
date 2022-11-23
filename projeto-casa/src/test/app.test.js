const app = require("../app")
const request = require("supertest")
const model = require("../models/PacienteSchema")

describe('Paciente Controller', () => {

  const pacienteMock = {
    nome:" Gre ",
telefone:" 1234 ",
endereco:" teste ",
plano_saude:" Unimed ",
plano_saude_numero:5871485962
  }

  beforeAll(async () => {
    const newpaciente = new model(pacienteMock)
    await newpaciente.save()

    pacienteMock.id 
  })

//testa quantos pacientes existem 200 ok
  test('GET /paciente/', (done) => {
     request(app)
     .get("/paciente/")
     .expect(200)
     .expect(response => {
        expect(response.body.message).toBe("Encontramos 2 pacientes.")
     })
     .end(err => {
        if (err) return done(err)
        return done()
     })
  })

 //testa se o banco de dados está vazio 404 ok
  test('GET /paciente/', (done) => {
    request(app)
    .get("/paciente/")
    .expect(404)
    .expect(response => {
       expect(response.body.message).toBe("Não encontramos nenhum paciente até o momento.")
    })
    .end(err => {
       if (err) return done(err)
       return done()
    })
 })

//testa paciente por id 200 ok
test("GET /paciente/:id", (done) => {
    request(app)
    .get("/paciente/" + pacienteMock.id)
    .expect(200)
    .expect(response=>{
      expect(response.body.Prezades).toBe(`Segue o paciente para este id [${pacienteMock.id}]:`)})
    .end(err => done(err))
  })

//testa paciente por id 404
// falta 
 
//teste criar usuario com o mesmo numero de plano 401 ok
  test("POST /paciente/", (done) => {
    const pacienteBody = {
      nome: "Grazielle a boazuda",
    telefone: "1234",
    endereco: "teste",
    plano_saude:"Unimed",
    plano_saude_numero: 587148596274
    }

    request(app)
    .post("/paciente/")
    .send(pacienteBody)
    .expect(401)
    .expect(response => {
       expect(response.body.message).toBe("Não é possível cadastrar esse número de plano novamente.")
    })
    .end(err => {
       return done(err)
    })
  })

//teste criar usuario 200 ok
test("POST /paciente/", (done) => {
    const pacienteBody = {
      nome: "Grazielle",
    telefone: "1234",
    endereco: "teste",
    plano_saude:"Unimed",
    plano_saude_numero: 5871485656226595
    }

    request(app)
    .post("/paciente/")
    .send(pacienteBody)
    .expect(200)
    .expect(response => {
       expect(response.body.message).toBe("Paciente cadastrado com sucesso")
    })
    .end(err => {
       return done(err)
    })
  })

//testa atualizar paciente encontrado 200 ok
  test("PATCH /paciente/:id", (done) => {
    const pacienteBody = {
      nome: "nome atualizado",
      telefone: "telefone atualizado",
      endereco: "teste",
    plano_saude:"Unimed",
    plano_saude_numero: 587148596274
    }
    request(app)
    .patch("/paciente/" + pacienteMock.id)
    .send(pacienteBody)
    .expect(200)
    .expect(response=>{
      expect(response.body.message).toBe("Paciente atualizado com sucesso")})
    .end(err => done(err))
  })

  //testa atualizar paciente não encontrado 404
  // falta 

  //testa delete 200 ok
  test("DELETE /paciente/:id", (done) => {
    request(app)
    .delete("/paciente/" + pacienteMock.id)
    .expect(200)
    .expect(response=>{
      expect(response.body.message).toBe("O paciente foi deletado com sucesso!")})
    .end(err => done(err))
  })

 //testa delete 404 ok
 //falta 

});
