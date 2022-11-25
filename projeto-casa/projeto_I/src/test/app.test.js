const app = require("../app");
const request = require("supertest");
const model = require("../models/BibliotecaModel");

describe("Biblioteca Controller", () => {
  const bibliotecaMock = {
    nome: "Jorge Leituras",
    cnpj: "50283756000163",
    cep: "88104230",
    rua: "Rua Mario Estevão dos Santos",
    numero: "20",
    estado: "SC",
    cidade: "Sao Jose",
    bairro: "Ponta de Baixo",
    pessoaResponsavel: "Jorge Cleber"
  };    

  beforeAll(async () => {
    const newBiblioteca = new model(bibliotecaMock);
    await newBiblioteca.save(); 

    bibliotecaMock.id = newBiblioteca._id;
  });
  test("GET /biblioteca", (done) => {
    request(app)
      .get("/biblioteca")
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe("Bibliotecas cadastradas");
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  test("POST /biblioteca", (done) => {
    const bibliotecaBody = {
        nome: "Jorge Leituras",
        cnpj: "50283756000163",
        cep: "88104230",
        rua: "Rua Mario Estevao dos Santos",
        numero: "20",
        estado: "SC",
        cidade: "Sao Jose",
        bairro: "Ponta de Baixo",
        pessoaResponsavel: "Jorge Cleber"
    };
    request(app)
      .post("/biblioteca")
      .send(bibliotecaBody)
      .expect(201)
      .expect((res) => {
        expect(res.body.biblioteca.nome).toBe("Jorge Leituras");
      })
      .end((err) => {
        return done(err);
      });
  });
  test("PATCH /biblioteca/:id", (done) => {
    const bibliotecaBody = {
      nome: "Jorge Leituras",
      pessoaResponsavel: "Cleber Silvio",
    };
    request(app)
      .patch("/biblioteca/:id" + bibliotecaMock.id)
      .send(bibliotecaBody)
      .expect(200)
      .expect((res) => {
        expect(res.body.biblioteca.nome).toBe("Jorge Leituras");
        expect(res.body.biblioteca.marca).toBe("Cleber Silvio");
      })
      .end((err) => done(err));
  });

  test("DELETE /biblioteca/:id", (done) => {
    const bibliotecaBody = {
      id: "",
    };
    request(app)
      .delete("/biblioteca/:id" + bibliotecaMock.id)
      .send(bibliotecaBody)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe("Biblioteca deletada com sucesso");
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});