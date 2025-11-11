require("dotenv").config();
const express = require("express");

const { router } = require("./routes/userRoutes");
const app = express();

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("app is running at", process.env.PORT);
});
