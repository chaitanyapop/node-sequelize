const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const CourseModel = sequelize.define("course", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
});

module.exports = { CourseModel };
