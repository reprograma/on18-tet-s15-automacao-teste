const app = require("../app")
const request = require("supertest")
const model = require("../models/CozinhaSchema")

describe('Cozinha Controller', () => {

    const cozinhaMock = {
        nome: "Cozinha teste",
        cnpj: 123456789,
        telefone:"12345678",
        endereco: {
            cep: "123",
            rua: "rua direta do Santo Antônio",
            numero: 15,
            estado: "Bahia",
            cidade: "Salvador",
            bairro: "Santo Antônio"
        },
        bairros_atuantes: ["Pelourinho","Santo Antônio", "2 de Julho"],
        pessoa_responsavel: "Wlianna"
    }
    
    beforeAll(async () => {
        const newCozinha = new model(cozinhaMock)
        await newCozinha.save()

        cozinhaMock.id = newCozinha._id
    })

    afterAll(async () => {
        await model.deleteMany() //deletar muitos
    })

    test('GET /cozinhas/buscar', (done) => {
        request(app)
        .get("/cozinhas/buscar")
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Cozinhas carregadas com sucesso")
        })
        .end(err => {
            if (err) return done(err)
            return done()
        })  
    });

    test("POST /cozinhas/cadastrar", (done) => {
        const cozinhaBody = {
            nome: "Cadê a comida",
            cnpj: 1234567892,
            telefone:"1234567891",
            endereco: {
                cep: "123",
                rua: "rua direta do Santo Antônio",
                numero: 15,
                estado: "Bahia",
                cidade: "Salvador",
                bairro: "Santo Antônio"
            },
            bairros_atuantes: ["Pelourinho","Santo Antônio", "2 de Julho"],
            pessoa_responsavel: "Larissa"
        }
        request(app)
        .post("/cozinhas/cadastrar")
        .send(cozinhaBody)
        .expect(201)
        .expect(res => {
            expect(res.body.cozinha.nome).toBe("Cadê a comida")
        })
        .end(err => {
            return done(err)
        })
    });

    test("PATCH /cozinhas/atualizar/:id", (done) => {
        const cozinhaBody = {
            nome: "Comer bem",
            pessoa_responsavel: "JC"
        }
        request(app)
        .patch("/cozinhas/atualizar/" + cozinhaMock.id)
        .send(cozinhaBody)
        .set("Accept", "application/json") // isso insere um campo header
        .expect(200)
        .expect(res => {
            expect(res.body.cozinha.nome).toBe("Comer bem")
            expect(res.body.cozinha.pessoa_responsavel).toBe("JC")
        })
        .end(err => done(err))
    });

    test("GET /cozinhas/buscar/:_id",(done) =>  {
        request(app)
        .get(`/cozinhas/buscar/${cozinhaMock.id}`)
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Cozinha encontrada!")
        })
        .end(err => done(err))
    })

    test("DELETE /cozinhas/deletar/:id", (done) => {
        request(app)
        .delete(`/cozinhas/deletar/${cozinhaMock.id}`)
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Cozinha removida do sistema!")
        })
        .end(err => done(err))
        
        test("Deve retornar 404 ao não encontrar uma cozinha no sistema", (done) => {
            let fakeId = "637ebe6f4abffd2543edd9df"
            request(app)
            .get("/cozinhas/buscar/" + fakeId)
            .expect(404)
            .end(err => done(err))
        })
    })

});