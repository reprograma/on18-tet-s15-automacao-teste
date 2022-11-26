const app = require('../app');
const request = require("supertest");
const model = require("../models/colaboradorasModels");

describe('Colaboradora Controller', () => {

    const colaboradoraMock = {
        email: "msg@test.co",
        password: "msgtest",
        preferenceName: "MobiSuitTest"
    };
    beforeAll(async () => {
        const newColaboradora = new model(colaboradoraMock)
        await newColaboradora.save();
        colaboradoraMock.id = newColaboradora._id;
    })

    test('Get /colaboradoras/all', (done) => {
      request(app)
      .get("/colaboradoras/all")
      .expect(200)
      .expect(res => {
        expect(res.body.message).toBe("Colaboradoras carregadas com sucesso!");
      })
      .end(err => {
        if(err) return done(err)
            return done();
      })
    });

    test("POST /colaboradoras/create", (done) => {
        const colaboradoraBody = {
            email: "msg@gundam.co",
            password: "msg",
            preferenceName: "MobileSuitGundam"
        }

        request(app)
        .post("/colaboradoras/create")
        .end(err => {
            return done(err);
        })
    })

    test("/PUT /colaboradoras/update/:id", (done) => {
        const colaboradoraBody = {
            email: "newemail@msg.co",
            preferenceName: "newcolaboradora"
        }
        request(app).put("/colaboradoras/update/" + colaboradoraMock.id)
        .send(colaboradoraBody)
        .expect(200)
        .expect(res => {
            expect(res.body.colaboradora.email).toBe("newemail@msg.co")
            expect(res.body.colaboradora.preferenceName).toBe("newcolaboradora")
        })

        .end(err => done(err))
    })

});
  