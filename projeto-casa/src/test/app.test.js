const app = require("../app");
const request = require("supertest");
const model = require("../models/bibliotecaModel");

describe("Produtos Controller", () => {
    const bibliotecaMock ={
        nome: "Biblioteca Teste",
        cnpj: 111222000133,        
        iniciativa_privada:true,
        endereco:{
            cep: '11222-333',
            rua: 'rua XYZ',
            numero: '999',
            estado: 'SC',
            cidade: 'cidade',
            bairro: 'bairro'
            },
        bairros_atuantes:['bairro1', 'bairro2', 'bairro3'],
        atividades_disponiveis: ['leitura', 'aluguel', 'poesia'],
        site: "http://bibliotecateste.com.br",
        responsavel:'Responsavel Teste'
    };

    beforeAll(async()=>{
        const newBiblioteca = new model(bibliotecaMock)
        await newBiblioteca.save()
        bibliotecaMock.id = newBiblioteca._id
    });

    test("GET /bibliotecas/listar", (done) => {
        request(app)
            .get("/bibliotecas/listar")
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe("Listando bibliotecas");
            })
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });

    test("POST /bibliotecas/criar", (done) => {

        const bibliotecaBody ={
            nome: "Biblioteca2 Teste",
            cnpj: 221222000133,        
            iniciativa_privada:true,
            endereco:{
                cep: '21222-333',
                rua: 'rua XYZA',
                numero: '9999',
                estado: 'SC',
                cidade: 'cidadeX',
                bairro: 'bairroX'
                },
            bairros_atuantes:['bairro1', 'bairro2', 'bairro3'],
            atividades_disponiveis: ['leitura', 'aluguel', 'poesia'],
            site: "http://bibliotecateste.com.br",
            responsavel:'Responsavel Teste'
        };

        request(app)
            .post("/bibliotecas/criar")
            .send(bibliotecaBody)
            .expect(201)
            .expect((res) => {
                expect(res.body.biblioteca.nome).toBe("Biblioteca2 Teste");
            })
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });

    test("DELETE /bibliotecas/remover/:id", (done) => {

        request(app)
            .delete("/bibliotecas/remover/" + bibliotecaMock.id)
            // .send({id: ""})
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe("Biblioteca removida com sucesso");
            })
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });

    test("DELETE /bibliotecas/remover/:id 404", (done) => {

        request(app)
            .delete("/bibliotecas/remover/2222")
            // .send({id: ""})
            .expect(404)
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });
    
});