const app = require("./src/app");

const PORT = process.env.PORT || 8081

app.listen(PORT, () => console.log(`Sincronizado em ${PORT}`))