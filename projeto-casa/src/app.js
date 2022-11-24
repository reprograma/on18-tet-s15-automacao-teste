require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config/mongoConnect");

app.use(express.json());
app.use(cors());

config.connect();

const produtosRoutes = require("./routes/produtosRoutes");

app.use("/produtos", produtosRoutes);

module.exports = app;
