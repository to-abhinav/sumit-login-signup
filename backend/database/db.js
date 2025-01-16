const mongoose = require("mongoose");
require("dotenv").config();


const dbURI = process.env.MONGODB_URI;
const connectToDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to DB");
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

module.exports = connectToDB;
