const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const StudentModel = sequelize.define("student", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = { StudentModel };
