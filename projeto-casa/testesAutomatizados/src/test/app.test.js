const app = require('../app')
const request = require('supertest')
const model = require("../models/PacienteSchema")
const { response } = require('../app')


describe( 'Paciente Controller' , () =>{

    const pacienteMock = {
        
        nome: "Maria",
        telefone: "26559090",
        endereco: "Rua Paulista, 76",
        plano_saude: "Amil",
        plano_saude_numero: 9


    }

  
    beforeAll(async() => {

        const newPaciente = new model(pacienteMock)
        await newPaciente.save()
        pacienteMock.id = newPaciente._id
    })
    
    
    test("POST /paciente/criar", (done) => {
        const pacienteBody = {
            nome: "Luciana",
            telefone: "7852234654",
            endereco: "rua Brasília, n 600, Taquaritinga do Norte/PE",
            plano_saude: "Bradesco",
            plano_saude_numero: 2765654346567
        }
        request(app)
            .post("/paciente/criar")
            .send(pacienteBody)
            .expect(201)
            .expect(response => {

                expect(response.body.message).toBe()
            })
            .end(err => {
               if (err) return done(err)
               return done()
            })
    })



    test ('GET/paciente/buscar',  (done)=> {
        request(app)
            .get("/paciente/buscar")
            .expect(200)
            
            .expect(response => {
                expect(response.body.message).toBe("Pacientes carregados com sucesso!")  
            })

        
            .end(error => {
                if (error) return done(error)
                return done()
            })




    })



    test("DELETE /paciente/deletarpaciente/:id", (done) => {
        request(app)
        .delete("/paciente/deletarpaciente/" + pacienteMock.id)
        .expect(200)
        
        .expect(response=>{
            expect(response.body.message).toBe("Paciente removido com sucesso!")
        
        })
       
        .end(error => {
            return done(error)
        })
    
    
    })

    
   

    test('GET /paciente/buscarpaciente/:id', (done)=>{
        request (app)
        .get("/paciente/buscarpaciente/" + pacienteMock.id)
        .expect(200)
        .expect(res =>{
            expect(res.body.message).toBe()
        })
        .end(err=>{
            if (err) return done(err)
            return done()
        })
    })





})
