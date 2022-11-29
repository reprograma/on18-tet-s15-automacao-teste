const app = require('../app');
const request = require('supertest');
const model = require('../models/BibliotecaSchema');

//teste criar biblioteca
describe('Biblioteca Controller', () => {
    const bibliotecaMock = {
        nome: "Biblioteca Teste",
        cnpj: "123456789101122",
        iniciativa_privada: false,
        endereco: {
            cep: 'cepteste',
            rua: 'rua teste',
            numero: 12,
            estado: 'estadoteste',
            cidade: 'cidadeteste',
            bairro: 'bairroteste'
        },
        bairros_atuantes: 'bairrosteste',
        site: "siteteste",
        atividades_disponiveis: 'ativteste',
        responsavel: 'Nati'
    }
    beforeAll(async () => { // antes de todos
        const newBiblioteca = new model(bibliotecaMock)
        await newBiblioteca.save()

        bibliotecaMock.id = newBiblioteca._id

    })

    afterAll(async() => {
        await model.deleteMany()
      })


    //teste mostrar todas as bibliotecas
    test('GET /biblioteca/all', (done) => {
        request(app)
            .get("/biblioteca/all")
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe("Exibindo todas as bibliotecas com sucesso!")
            })
            .end((err) => {
                if (err) return done(err)
                return done()
            })
    })

    //teste buscar por id
    test('GET /biblioteca/buscar/:id', (done) => {
        request(app)
            .get('/biblioteca/buscar/' + bibliotecaMock.id)
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe("Biblioteca encontrada")
            })
            .end((err) => {
                if (err) return done(err)
                return done()
            })
    })


    //teste criar nova biblioteca
    test("POST /biblioteca/criar", (done) => {
        const bibliotecaBody = {
            nome: "Biblioteca Teste",
            cnpj: "123456789101122",
            iniciativa_privada: false,
            endereco: {
                cep: 'cepteste',
                rua: 'rua teste',
                numero: 12,
                estado: 'estadoteste',
                cidade: 'cidadeteste',
                bairro: 'bairroteste'
            },
            bairros_atuantes: 'bairrosteste',
            site: "siteteste",
            atividades_disponiveis: 'ativteste',
            responsavel: 'Nati'
        }
        request(app)
            .post('/biblioteca/criar')
            .send(bibliotecaBody)
            .expect(201)
            .expect((res) => {
                expect(res.body.biblioteca.nome).toBe("Biblioteca Teste")
            })
            .end((err) => {
                return done(err)
            })
    })

    test('PATCH /biblioteca/atualizar/:id', (done) => {
        const bibliotecaBody = {
            nome: "Biblioteca Teste",        
            endereco:{
                cep: 'cepteste',
                rua: 'ruateste',
                numero: 'numeroteste',
                estado: 'estadoteste',
                cidade: 'cidadeteste',
                bairro: 'bairroteste'
                },
            responsavel:'Nati'
            }
            request(app)
            .patch('/biblioteca/atualizar/' + bibliotecaMock.id)
            .send(bibliotecaBody)
            .expect(200)
            .expect((res) => {
                expect(res.body.nome).toBe("Biblioteca Teste")
                expect(res.body.message).toBe("Biblioteca atualizada com sucesso!")
            })
            .end((err)=>{
                if(err) return done(err)
                return done()
            })
    })
    
    test('DELETE /biblioteca/deletar/:id', (done) => {
        const bibliotecaBody = {
            id: "",
        }
        request(app)
            .delete('/biblioteca/deletar/' + bibliotecaMock.id)
            .send(bibliotecaBody)
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe("Biblioteca removida do banco de dados.")
            })
            .end((err) => {
                if (err) return done(err)
                return done()
            })
    })

})