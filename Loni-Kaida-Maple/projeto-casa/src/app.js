require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pokemonRoutes = require('./routes/pokemonsRoutes');
const db = require('../src/config/mongoConnect');


const app = express();

db.connect();

app.use(express.json());
app.use(cors());

app.use('/pkm', pokemonRoutes);

module.exports = app;