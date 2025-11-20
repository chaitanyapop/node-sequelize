require("dotenv").config();
const express = require("express");
const { sequelize } = require("./config/dbConnection");
require("./association");

const { router } = require("./routes/userRoutes");
const { profileRouter } = require("./routes/profileRoutes");
const { blogRouter } = require("./routes/blogRoutes");
const { studentRouter } = require("./routes/studentRoute");
const { courseRouter } = require("./routes/courseRoute");
const app = express();
app.use(express.json());
app.use("/", router);
app.use("/profile", profileRouter);
app.use("/blog", blogRouter);
app.use("/student", studentRouter);
app.use("/course", courseRouter);
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

app.listen(process.env.PORT_STAGE, async () => {
  console.log("app is running at", process.env.PORT_STAGE);
  try {
    await sequelize.authenticate();
    if (process.env.NODE_ENV == "stage") {
      await sequelize.sync({ alter: true });
    }
    console.log("db connected successfully");
  } catch (error) {
    console.log("db connection failed", error);
  } // this function is used to connect to the database and its configuration which we did in const sequelize = new Sequelize
});
