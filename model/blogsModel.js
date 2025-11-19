const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const BlogsModel = sequelize.define(
  "user_blogs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blogs: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, // this is the FK means it has link to the userModel or user table
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = { BlogsModel };
