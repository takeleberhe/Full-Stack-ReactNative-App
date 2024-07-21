require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("+++++++database connected++++++++ ");
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  connectDB,
};
