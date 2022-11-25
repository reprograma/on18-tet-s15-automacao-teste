const app = require('../app')
const request = require("supertest")
const model = require("../models/colaboradorasModels")

describe("Colaboradora Controller", () => {
    const colaboradoraMock = {
        email: "pri@email.com",
        password: "1234",
        preferenceName: "teste"
    }

    beforeAll(async () => {
        const newColaboradora = new model(colaboradoraMock)
        await newColaboradora.save()

        colaboradoraMock.id = newColaboradora._id
    })

    test("GET /colaboradora/all", (done) => {
        request(app)
            .get("/colaboradoras/all")
            .expect(200)
            .expect(res => {
                expect(res.body.message).toBe("Colaboradoras carregadas com sucesso!")
            })
            .end(err => {
                if (err) return done(err)
                return done()
            })
    })
    test("POST /colaboradoras/create", (done) => {
        const colaboradoraBody = {
            email: "pri@email.com",
            password: "1234",
            preferenceName: "Pri"
        }

        request(app)
            .post("/colaboradoras/create")
            .send(colaboradoraBody)
            .expect(201)
            .expect(res => {
                expect(res.body.colaboradora.email).toBe("pri@email.com")
            })
            .end(err => {
                return done(err)
            })
    })

    test("PUT /colaboradoras/update/:id", (done) => {
        const colaboradoraBody = {
            email: "novoemail@email.com",
            preferenceName: "nome atualizado"
        }
        request(app).put("/colaboradoras/update/" + colaboradoraMock.id)
            .send(colaboradoraBody)
            .expect(200)
            .expect(res => {
                expect(res.body.colaboradora.email).toBe("novoemail@email.com")
            }).end(err => done(err))
    });
});