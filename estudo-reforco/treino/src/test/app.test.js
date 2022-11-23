const app = require("../app")
const request = require("supertest")
const model = require("../models/colaboradorasModels")

describe('Colaboradora Controller', () => {
    // essa const é uma colaboradora para simulação

    const colaboradoraMock = {
        email: "email@test.com",
        password: "1234",
        preferenceName: "teste"

    }

    // função de setup
    beforeAll(async() => {

        const newColaboradora = new model(colaboradoraMock)
         
        await newColaboradora.save()

        colaboradoraMock.id = newColaboradora._id


    })




    test('GET /colaboradoras/all', (done) => {
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
    });

    test("POST /colaboradoras/create", (done)=> {
        const colaboradoraBody = {
            email: "cami@email.com",
            password: "1234",
            preferenceName: "Cami"
        }

        request(app)
        .post("/colaboradoras/create")
        .send(colaboradoraBody)
        .expect(201)
        .expect(res => {
            // testa o que eu recebo
            expect(res.body.colaboradora.email).toBe("cami@email.com")
        })
        .end(err => {
            return done(err)
        })
    })


    test(" PUT /colaboradoras/update/:id", (done) => {
        const colaboradoraBody = {
            email: "novoemail@email.com",
            preferenceName: "nome atualizado"
        }
        request(app)
        .put("/colaboradoras/update/" + colaboradoraMock.id)
        .send(colaboradoraBody)
        .expect(200)
        .expect(res => {
            expect(res.body.colaboradora.email).toBe("novoemail@email.com")
            expect(res.body.colaboradora.preferenceName).toBe("nome atualizado")
        })
        .end(err => done(err))
    })
});






// para cada expect eu coloco o que precisa vir como response e/ou como parte do body
//exp(200) - statusCode da response
//exp(res.body.message) -- mensagem que eu mandei no body
//exp(colaboradoras)

// no create: é importante olhar os requisitos do body, para fazer o teste
// o mock é para dizer que é simulada
// banco de teste precisa ser um banco descartável e pra vc fazer isso, vc precisa de um setup