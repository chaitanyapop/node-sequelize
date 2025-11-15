const { Sequelize } = require("sequelize");
require("dotenv").config();
const { config } = require("./db.config");
const env = process.env.NODE_ENV;
const dbConfig = config[env];
const sequelize = new Sequelize(
  dbConfig.dbName,
  dbConfig.userName,
  dbConfig.password,
  dbConfig
);

module.exports = { sequelize };
