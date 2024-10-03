const mongoose = require("mongoose");

require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL;

exports.DBConnect = () => {
  mongoose
    .connect(DATABASE_URL)
    .then(() => {
      console.log("DB Connected Suucessffully ...!");
    })
    .catch(() => {
      console.log("DB Is Not Conneccted Successfully ...!");
    });
};
