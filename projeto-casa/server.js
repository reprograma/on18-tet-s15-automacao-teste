require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Servidor Projeto Casa Semana 15 rodando na porta ${PORT}!`)
);
