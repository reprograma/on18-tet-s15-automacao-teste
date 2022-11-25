const app = require('../app')
const request = require('supertest')
const model = require('../models/colaboradorasModels')

describe('Colaboradora Controller', () => {

    const colaboradoraMock = {
        email: "email@test.com",
        password: "1234",
        preferenceName: "teste"
    }

    beforeAll(async () => {
        const newColaboradora = new model(colaboradoraMock)
        await newColaboradora.save()

        colaboradoraMock.id = newColaboradora._id
    })
    afterAll(async ()=>{
        await model.deleteMany()
    })

    test('GET /colaboradoras/all', (done) => {
        request(app).get("/colaboradoras/all")
            .expect(200)
            .expect(res => {
                expect(res.body.message).toBe("Colaboradoras carregadas com sucesso!")
                expect(res.body.colaboradors.length).toBe(1)
            })
            .end(err => {
                if (err) return done(err)
                return done()
            })
    })
    test("POST /colaboradoras/create", (done) => {
        const colaboradoraBody = {
            email: "ellen.samanta@outlook.com",
            password: '1234',
            preferenceName: "Pri"
        }
        request(app)
            .post("/colaboradoras/create")
            .send(colaboradoraBody)
            .expect(201)
            .expect(res => {
                expect(res.body.colaboradora.email).toBe("ellen.samanta@outlook.com")
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

        request(app)
        .put("/colaboradoras/update/" + colaboradoraMock.id)
            .send(colaboradoraBody)
            .set("Accept", "application/json")
            .expect(200)
            .expect(res => {
                expect(res.body.colaboradora.email).toBe("novoemail@email.com")
                expect(res.body.colaboradora.preferenceName).toBe("nome atualizado")

            })
            .end(err => done(err))
    })
    test("GET /colaboradoras/:id",(done)=>{
        request(app)
        .get(`/colaboradoras/${colaboradoraMock.id}`)
        .expect(200)
        .end((err)=>done(err))
    })
    test("DELETE /colaboradoras/delete/:id", (done)=>{
        request(app)
        .delete(`/colaboradoras/delete/${colaboradoraMock.id}`)
        .expect(200)
        .end(err=>done(err))
    })
    test("Podera erro 404 se não encontrar uma colaboradora",(done)=>{
        let fakeId='637ebe6f4abffd2543edd9df'
        request(app).get("/colaboradoras/"+fakeId)
        .expect(404).end(err =>done(err))
    })
})
