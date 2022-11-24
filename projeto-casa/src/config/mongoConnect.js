const mongoose = require("mongoose");

const connect = async () => {
  return mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB conectado.");
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

module.exports = {
  connect,
};
