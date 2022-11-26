const app = require('../app');
const request = require("supertest");
const model = require('../models/BibliotecaSchema')

describe('Biblioteca Controller', () => {

    const bibliotecaMock = {
        nome: "Livraria da Canja",
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

      // para apagar o banco de dados se usa a função afterAll
      // afterAll(async() => {
      //   await model.deleteMany()
      // })

    test('GET /bibliotecas/buscar', (done) => {

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
            nome: "Livraria da Treta",
            cnpj:"89576395264255",
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
            bairros_atuantes: ["Pernambuco","casa", "Casa forte"],
            site: "eunaoseioqcolocarla.com.br",
            atividades_disponiveis: "Leitura e comida",
            responsavel: "eu"
        }
    
        request(app)
        .post("/bibliotecas/criar")
        .send(bibliotecaBody)
        .expect(201)
        .expect(res => {
           expect(res.body.biblioteca.nome).toBe("Livraria da Treta")
        })
        .end(err => {
           return done(err)
        })
      })

      // test("PUT /bibliotecas/update/:id", (done) => {
      //   const bibliotecaBody = {
      //       nome: "Livraria da Rosa",
      //       telefone: "5556559",
      //       iniciativa_privada: false,
      //       endereco: {
      //           cep: "50740-170",
      //           rua: "Praça de casa forte",
      //           numero: 19,
      //           complemento: "Perto da praça",
      //           referencia: "Perto da praça",
      //           estado: "Pernambuco",
      //           cidade: "Recife",
      //           bairro: "Casa forte"
      //       },
      //       bairros_atuantes: ["Pernambuco","Recife", "Casa forte"],
      //       site: "esperoqueissorode.com.br",
      //       atividades_disponiveis: "Leitura e comida",
      //       responsavel: "eu"
      //   }
      //   request(app)
      //   .put("/bibliotecas/update/" + bibliotecaMock.id)
      //   .send(bibliotecaBody)
      //   .expect(200)
      //   .expect(res => {
      //     expect(res.body.biblioteca.telefone).toBe("5556559")
      //     expect(res.body.biblioteca.site).toBe("esperoqueissorode.com.br")
      //   })
      //   .end(err => done(err))
      // })

      // test('PATCH /bibliotecas/atualizar/:id', (done)=>{
      //   const bibliotecaBody ={
      //       nome: "Biblioteca Teste",        
      //       endereco:{
      //           cep: 'cepteste4',
      //           rua: 'rua teste4',
      //           numero: 'numeroteste4',
      //           estado: 'estadoteste4',
      //           cidade: 'cidadeteste4',
      //           bairro: 'bairroteste4'
      //           },
      //       responsavel:'responsteste4'
      //       }
      //       request(app)
      //       .patch('/bibliotecas/atualizar/' + bibliotecaMock.id)
      //       .send(bibliotecaBody)
      //       .set("Accept", "application/json")
      //       .expect(200)
      //       .expect((res) => {
      //           expect(res.body.message).toBe('Biblioteca atualizada com sucesso!')
      //           expect(res.body.biblioteca.nome).toBe("Biblioteca Teste");
      //       })
      //       .end((err)=>{
      //           if(err) return done(err)
      //           return done()
      //       })
      //     })

    test('DELETE /bibliotecas/deletar/:id', (done) => {
            const bibliotecaBody = {
                id: "",
            }
            request(app)
                .delete("/bibliotecas/deletar/" + bibliotecaMock.id)
                .send(bibliotecaBody)
                .expect(200)
                .expect((res) => {
                    expect(res.body.message).toBe("Biblioteca deletada com sucesso!")
                })
                .end((err) => {
                    if (err) return done(err)
                    return done()
                })
    })
})


