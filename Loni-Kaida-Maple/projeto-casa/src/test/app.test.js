const app = require("../app");
const request = require("supertest");
const model = require("../models/pokemonsModels");

describe('Pokemon Controller', () => {

    const pokemonMock = {
        pokemonName: "PikaTest",
        pokemonType: "TestType",
        pokemonTrainerOt: "TestTrainer"
    };
    beforeAll(async () => {
        const newPokemon = new model(pokemonMock);
        await newPokemon.save();
        pokemonMock.id = newPokemon._id;
    })

    test('Get /pkm/', (done) => {
      request(app)
      .get("/pkm/")
      .expect(200)
      .expect(res => {
        expect(res.body.message).toBe("Pokemons carregados com sucesso!");
      })
      .end(err => {
        if(err) return done(err)
            return done();
      })
    });

    test('Get /pkm/id:', (done) => {
        request(app)
        .get(`/pkm/${pokemonMock.id}`)
        .expect(200)
        //.expect(res => {
          //expect(res.body.message).toBe("Pokemons carregados com sucesso!");
        //})
        .end(err => {
          if(err) return done(err)
              return done();
        })
      });

    test("POST /pkm/new", (done) => {
        const pokemonBody = {
            pokemonName: "bulbaTest",
            pokemonType: "grassType",
            pokemonTrainerOt: "TestWild"
        }

        request(app)
        .post("/pkm/new")
        .end(err => {
            return done(err);
        })

        request(app)
    .post("/pkm/create")
    .send(pokemonBody)
    .expect(201)
    .expect(res => {
       expect(res.body.pokemon.email).toBe("bulbaTest")
    })
    })

});