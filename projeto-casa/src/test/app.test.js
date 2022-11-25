const app = require('../app')
const request = require("supertest")
const model = require("../models/clinicaModel")
const { response } = require('../app')

describe('Clinica Controller', () => {
    const clinicaMock = {
        nome: "Gabriela Pacheco",
        telefone: "123456789",
        endereco: "rua 37, quarta etapa Rio Doce, Olinda/PE",
        plano_saude: "hapvida",
        plano_saude_numero: 278952107852230
    }

    beforeAll(async () => {
        const newClinica = new model(clinicaMock)
        await newClinica.save()

        clinicaMock.id = newClinica._id

    })
    test('GET /paciente/buscartodospacientes', (done) => {
        request(app)
            .get("/paciente/buscartodospacientes")
            .expect(200)
            .expect(response => {
                expect(response.body.message).toBe("Pacientes carregados com sucesso!")
            })
            .end(err => {
                if (err) return done(err)
                return done()
            })
    })
  
    test("POST /paciente/criarpaciente", (done) => {
        const pacienteBody = {
            nome: "Leticia Souza",
            telefone: "7852234654",
            endereco: "rua 77, n 80, Recife/PE",
            plano_saude: "Bradesco",
            plano_saude_numero: 27895258
        }
        request(app)
            .post("/paciente/criarpaciente")
            .send(pacienteBody)
            .expect(401)
            .expect(response => {

                expect(response.body.message).toBe("Não é possível cadastrar esse número de plano novamente.")
            })
            .end(err => {
                return done(err)
            })
    })
    test("PATCH /paciente/:id", (done) => {
        const pacienteBody = {
            nome: "nome atualizado",
            telefone: "telefone atualizado",
            endereco: "teste",
            plano_saude: "Unimed",
            plano_saude_numero: 587148596274
        }
        request(app)
            .patch("/paciente/atualizarpaciente" + clinicaMock.id)
            .send(pacienteBody)
            .expect(200)
            .expect(response => {
                expect(response.body.message).toBe("Paciente atualizado com sucesso")
            })
            .end(err => done(err))
    })
    test("DELETE /paciente/deletarpaciente/:id", (done) => {
           request(app)
           .delete("/paciente/deletarpaciente" + clinicaMock.id)
           .expect(200)
           .expect(response=>{
             expect(response.body.message).toBe("O paciente foi deletado com sucesso!")})
          .end(err => done(err))
         })


})