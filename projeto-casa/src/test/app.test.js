const app = require("../app");
const request = require("supertest");
const model = require("../models/produtosModels");

describe("Produtos Controller", () => {
  const produtosMock = {
    nome: "case",
    marca: "samsumg",
    descricao: "Capinha de celular",
    categoria: "acessorio",
    preco: "20",
  };

  beforeAll(async () => {
    const newProdutos = new model(produtosMock);
    await newProdutos.save();

    produtosMock.id = newProdutos._id;
  });
  test("GET /produtos/buscar/all", (done) => {
    request(app)
      .get("/produtos/buscar/all")
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe("Produtos carregados com sucesso:");
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  test("POST /produtos/create", (done) => {
    const produtosBody = {
      nome: "case 1",
      marca: "samsung",
      descricao: "Capinha de celular 1",
      categoria: "acessorio 1",
      preco: "30",
    };
    request(app)
      .post("/produtos/create")
      .send(produtosBody)
      .expect(201)
      .expect((res) => {
        expect(res.body.produtos.nome).toBe("case 1");
      })
      .end((err) => {
        return done(err);
      });
  });
  test("PUT /produtos/update/:id", (done) => {
    const produtosBody = {
      nome: "celular iphone 13",
      marca: "nome atualizado",
    };
    request(app)
      .put("/produtos/update/" + produtosMock.id)
      .send(produtosBody)
      .expect(200)
      .expect((res) => {
        expect(res.body.produtos.nome).toBe("celular iphone 13");
        expect(res.body.produtos.marca).toBe("nome atualizado");
      })
      .end((err) => done(err));
  });

  test("DELETE /produtos/delete/:id", (done) => {
    const produtosBody = {
      id: "",
    };
    request(app)
      .delete("/produtos/delete/" + produtosMock.id)
      .send(produtosBody)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe("Produto deletado com sucesso.");
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
