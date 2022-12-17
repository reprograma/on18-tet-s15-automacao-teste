const app = require('../app')
const request = require("supertest")
const model = require("../models/clinicaModel")
const { response } = require('../app')

describe('Clinica Controller', () => {
    const clinicaMock = {
        nome: "Ana Carolina",
        telefone: "100200300",
        endereco: "Rua josé ramão cantero ",
        plano_saude: "Unimed",
        plano_saude_numero: 7938000800
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
                expect(response.body.message).toBe("Pacientes listados")
            })
            .end(err => {
                if (err) return done(err)
                return done()
            })
    })

    test("POST /paciente/criarpaciente", (done) => {
        const pacienteBody = {
            nome: "Maria Almeida",
            telefone: "67987541455",
            endereco: "Rua presidente dutra, bairro monte castelo, n 502. Campo grande -ms",
            plano_saude: "São Francisco",
            plano_saude_numero: 301302304305
        }
        request(app)
            .post("/paciente/criarpaciente")
            .send(pacienteBody)
            .expect(401)
            .expect(response => {

                expect(response.body.message).toBe("Por favor insera outro numero para plano de saúde")
            })
            .end(err => {
                return done(err)
            })
    })
    test("PATCH /paciente/:id", (done) => {
        const pacienteBody = {
            nome: "Angela Boldrin",
            telefone: "6133456958",
            endereco: "Afonso pena, 420, centro",
            plano_saude: "CASSEMS",
            plano_saude_numero: 401402404
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
           .delete("/paciente/deletarpaciente/" + clinicaMock.id)
           .expect(200)
           .expect(response=>{
             expect(response.body.message).toBe("Cadastro do paciente foi deletado com sucesso!")})
          .end(err => done(err))
         })


})