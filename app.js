require("dotenv").config();
const express = require("express");
const { sequelize } = require("./config/dbConnection");
require("./model/userModel");

const { router } = require("./routes/userRoutes");
const app = express();

app.use("/", router);

app.listen(process.env.PORT_STAGE, async () => {
  console.log("app is running at", process.env.PORT_STAGE);
  try {
    await sequelize.authenticate();
    if (process.env.NODE_ENV == "stage") {
      await sequelize.sync({ force: true });
    }
    console.log("db connected successfully");
  } catch (error) {
    console.log("db connection failed", error);
  } // this function is used to connect to the database and its configuration which we did in const sequelize = new Sequelize
});
