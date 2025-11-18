const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const ProfileModel = sequelize.define(
  "profile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    }, // this is the FK means it has link to the userModel or user table
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = { ProfileModel };
