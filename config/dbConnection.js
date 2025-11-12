const { Sequelize } = require("sequelize");
require("dotenv").config();
async function dbConnection() {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.USER_NAME,
    process.env.PASSWORD,
    {
      host: "localhost",
      port: process.env.HOST,
      dialect: "mysql",
    }
  );
  try {
    await sequelize.authenticate();
    console.log("db connected successfully");
  } catch (error) {
    console.log("db connection failed", error);
  }
}
module.exports = { dbConnection };
