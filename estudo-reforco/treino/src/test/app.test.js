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

    afterAll(async() => {
        await model.deleteMany() // deleta tudo
        // await model.deleteMany({ nome }) se a gente não especifica, ele deleta tudo
    })




    test("GET /colaboradoras/all", (done) => {
        request(app)
        // verbos http
        .get("/colaboradoras/all")
        //statusCode que a gente passa na response; nesse teste eu válido que o endpoint funciona
        .expect(200)
        .expect(res => {
            // verificação no detalhe
           expect(res.body.message).toBe("Colaboradoras carregadas com sucesso!")
           //expect(res.body.colaboradoras).toBeIntanceOf(Array) - aqui eu garanto que eu recebo uma lista
           //expect(res.body.colaboradoras).toContains(colaboradoraMock) - aqui faz um find e verifica se está recebendo a colaboradoraMock
           //expect(res.body.colaboradoras.length).(aqui precisa de uma expressão que valida que é maior que zero)
           expect(res.body.colaboradoras.length).toBe(1)
        //    expect(res.body.colaboradoras).toBe([colaboradoraMock]) - valida que é a nossa colaboradora que está chegando
        })
        .end(err => {
            if (err) return done(err)
            return done()

            //.end(err => done(err)) - simplificação que também funciona
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


    test("PUT /colaboradoras/update/:id", (done) => {

        const colaboradoraBody = {
            email: "novoemail@email.com",
            preferenceName: "nome atualizado"
        }

        request(app)
        .put("/colaboradoras/update/" + colaboradoraMock.id)
        .send(colaboradoraBody)
        // chave e valor da header em caso de token
        // .set('Authorization', token)
        // esse set accept/ json  é pq nossa api é baseada em json, então é só esse tipo de documento que ela deve aceitar
        .set("Accept", "application/json")
        .expect(200)
        .expect(res => {
            expect(res.body.colaboradora.email).toBe("novoemail@email.com")
            expect(res.body.colaboradora.preferenceName).toBe("nome atualizado")
        })
        .end(err => done(err))
    })

    // como a gente está usando callback, precisamos receber um done, para indicar que o nosso teste terminou; quando a gente não chama o done, fica dando timeout

    test("GET /colaboradoras/:id", (done) => {
        request(app)
        .get(`/colaboradoras/${colaboradoraMock.id}`)
        .expect(200)
        .end((err) => done(err))
    });

    test("DELETE /colaboradoras/:id", (done) => {
        request(app)
        .delete(`/colaboradoras/delete/${colaboradoraMock.id}`)
        .expect(200)
        .end((err) => done(err))

    });

    //teste de caminho infeliz.
    
    test("Deve retornar um 404 ao não encontrar uma colaboradora", (done) => {

        let fakeId = "6380dbcd3d696c32119c5512"
        request(app)
        .get("/colaboradoras/" + fakeId)
        .expect(404)
        .end((err) => done(err))
    });


});


// quando não damos o done, o teste qubra



// para cada expect eu coloco o que precisa vir como response e/ou como parte do body
//exp(200) - statusCode da response
//exp(res.body.message) -- mensagem que eu mandei no body
//exp(colaboradoras)

// no create: é importante olhar os requisitos do body, para fazer o teste
// o mock é para dizer que é simulada
// banco de teste precisa ser um banco descartável e pra vc fazer isso, vc precisa de um setup