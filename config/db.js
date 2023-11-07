const mongoose = require("mongoose");
const colors = require("colors");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to Database${mongoose.connection.host}`.bgCyan.white
    );
  } catch (err) {
    console.log(`Error in MongoDB connection${err}`.bgRed.white);
  }
};

module.exports = connectMongoDB;
