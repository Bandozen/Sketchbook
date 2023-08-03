const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function dbConnect() {
  const mongoDB = await mongoose.connect(process.env.MONGO_URL,);
  console.log("MongoDB가 연결되었습니다.")

  return mongoDB;
}

exports.dbConnect = dbConnect;
