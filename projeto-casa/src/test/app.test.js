const app = require("../app")
const request = require("supertest")
const model = require("../models/PacienteSchema")


describe("Paciente Controller", () => {

    const pacienteMock = {
        nome: "Aka",
        telefone: "233640",
        endereco: "lua verde",
        plano_saude: true,
        plano_saude_numero: 6554
    }

    beforeAll(async() => {
        const novaPaciente = new model(pacienteMock)

        await novaPaciente.save()

        pacienteMock.id = novaPaciente._id

    })


    afterAll(async() => {
        await model.deleteMany()
    })

    test("GET /pacientes/buscar", (done) => {

        request(app)
        .get("/pacientes/buscar")
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Paciente encontrada!")
        })
        .end(err => {
            if (err) return done(err)
            return done()
        })
        

    });


    test("POST /pacientes/criar", (done) => {

        const novaPaciente = {
            nome: "Bruna",
            telefone: "4556-1963",
            endereco: "Rua Nova",
            plano_saude: true,
            plano_saude_numero: 55664
        }


        request(app)
        .post("/pacientes/criar")
        .send(novaPaciente)
        .expect(201)
        .expect(res => {
            expect(res.body.paciente.nome).toBe("Bruna")
        })
        .end(err => {
            return done(err)
        })
    });


    test("PATCH /pacientes/atualizar/:id", (done) => {

        const atualizarPaciente = {
            nome: "Luiza"
        }

        request(app)
        .patch("/pacientes/atualizar/" + pacienteMock.id)
        .send(atualizarPaciente)
        .set("Accept", "application/json")
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Paciente atualizada com sucesso!")
            expect(res.body.paciente.nome).toBe("Luiza")
        })
        .end(err => done(err))
    });


    test("DELETE /pacientes/deletar/:id", (done) => {
        request(app)
        .delete("/pacientes/deletar/" + pacienteMock.id)
        .expect(200)
        .end(err => done(err))
        
    });

    test('GET /buscar/:id ', () => {
        request(app)
        .get("/pacientes/buscar/" + pacienteMock.id)
        .expect(200)
        .expect(res => {
            expect(res.body.colaboradoras).toBe(pacienteMock)
        })
        .end()
    });

    test('Deve retornar um erro ao não encontrar uma paciente e um 404', () => {
        let idFake = "638114f070de5e77ffacdf86"
        request(app)
        .get("/pacientes/buscar/" + idFake)
        .expect(404)
        .expect(res => {
            expect(res.body.message).toBe("Paciente não encontrada!")
        })
    });


});