const mongoose = require("mongoose");

const connect = async () => {
  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('db conectado')
    })
    .catch((error) => {
      console.erroror(error);
      throw error;
    });
};

module.exports = {
  connect,
};
