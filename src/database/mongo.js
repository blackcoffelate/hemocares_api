require("dotenv").config();
const { mongoURL, mongoOptions } = require("../config");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
}

const createConnection = async () => {
    await mongoose.connect(mongoURL, mongoOptions);
};

module.exports = {
  createConnection
};
