require("dotenv").config();
const config = {
  stage: {
    userName: process.env.USER_NAME_STAGE,
    dbName: process.env.DB_NAME_STAGE,
    password: process.env.PASSWORD_STAGE,
    host: process.env.HOST_NAME_STAGE,
    port: process.env.PORT_DB_STAGE,
    dialect: process.env.DIALECT_STAGE,
  },
};

module.exports = { config };
