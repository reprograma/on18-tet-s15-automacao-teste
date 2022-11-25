const app = require('../app');
const request = require("supertest");
const model = require('../models/BibliotecaSchema')

describe('Biblioteca Controller', () => {

    const bibliotecaMock = {
        nome: "Livraria da Praça",
        cnpj:"89576395264287",
        telefone: "555649",
        iniciativa_privada: false,
        endereco: {
            cep: "50740-170",
            rua: "Praça de casa forte",
            numero: 19,
            complemento: "Perto da praça",
            referencia: "Perto da praça",
            estado: "Pernambuco",
            cidade: "Brasil",
            bairro: "teste"
        },
        bairros_atuantes: ["Pernambuco","Recife", "Casa forte"],
        site: "eunaoseioqcolocaraqui.com.br",
        atividades_disponiveis: "Leitura e comida",
        responsavel: "eu"
      }
    
      beforeAll(async () => {
        const newBiblioteca = new model(bibliotecaMock)
        await newBiblioteca.save()
    
        bibliotecaMock.id = newBiblioteca._id
      })

    test('GET /bibliotecas/buscar', (done) => {
        // opção 1:
        //test('GET /bibliotecas/buscar', async() => {
        // const response = await request(app).get("bibliotecas/buscar")

        // expect(response.status).toBe(200)
        // expect(response.body).toBe(biblioteca)

        // opção 2: 
        request(app)
        .get("/bibliotecas/buscar")
        .expect(200)
        .expect(res => {
           expect(res.body.message).toBe("Bibliotecas carregadas com sucesso!")
        })
        .end(err => {
           if (err) return done(err)
           return done()
        })
    })

    test("POST /bibliotecas/criar", (done) => {

        const bibliotecaBody = {
            nome: "Livraria da Praça",
            cnpj:"89576395264287",
            telefone: "555649",
            iniciativa_privada: false,
            endereco: {
                cep: "50740-170",
                rua: "Praça de casa forte",
                numero: 19,
                complemento: "Perto da praça",
                referencia: "Perto da praça",
                estado: "Pernambuco",
                cidade: "Recife",
                bairro: "Casa forte"
            },
            bairros_atuantes: ["Pernambuco","Recife", "Casa forte"],
            site: "eunaoseioqcolocaraqui.com.br",
            atividades_disponiveis: "Leitura e comida",
            responsavel: "eu"
        }
    
        request(app)
        .post("/bibliotecas/criar")
        .send(bibliotecaBody)
        .expect(201)
        .expect(res => {
           expect(res.body.biblioteca.responsavel).toBe("eu")
        })
        .end(err => {
           return done(err)
        })
      })

      test("PUT /bibliotecas/update/:id", (done) => {
        const bibliotecaBody = {
            nome: "Livraria da Rosa",
            cnpj:"89576395264287",
            telefone: "5556559",
            iniciativa_privada: false,
            endereco: {
                cep: "50740-170",
                rua: "Praça de casa forte",
                numero: 19,
                complemento: "Perto da praça",
                referencia: "Perto da praça",
                estado: "Pernambuco",
                cidade: "Recife",
                bairro: "Casa forte"
            },
            bairros_atuantes: ["Pernambuco","Recife", "Casa forte"],
            site: "esperoqueissorode.com.br",
            atividades_disponiveis: "Leitura e comida",
            responsavel: "eu"
        }
        request(app)
        .put("/bibliotecas/update/" + bibliotecaMock.id)
        .send(bibliotecaBody)
        .expect(200)
        .expect(res => {
          expect(res.body.biblioteca.telefone).toBe("5556559")
          expect(res.body.biblioteca.site).toBe("esperoqueissorode.com.br")
        })
        .end(err => done(err))
      })

})
