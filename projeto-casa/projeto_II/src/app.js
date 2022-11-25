require("dotenv").config();

const express = require("express");
const cors = require("cors");

const cozinhaRoutes = require("./routes/cozinhaRoutes");
const database = require("./database/mongooseConnect");

const app = express();

database.connect();

app.use(express.json());
app.use(cors());

app.use("/cozinhas", cozinhaRoutes);

module.exports = app;



