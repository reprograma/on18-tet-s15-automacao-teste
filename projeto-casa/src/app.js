const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const db = require('./database/mongoConfig');
const pacienteRoutes = require('./routes/pacienteRoutes');
const userRoutes = require('./routes/userRoutes')

db.connect();

app.use(cors());
app.use(express.json());
app.use("/paciente", pacienteRoutes);
app.use("/users", userRoutes)

module.exports = app;