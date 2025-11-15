const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const user = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    //freezeTableName: true, //means the model name and the table name will be same
    tableName: "users", // use this table name for model User
    timestamps: false, // when it creates table it adds two extra column createdAt and updatedAt to not to have them we have to mention this and if we want only one of them then also we can do it refer doc
  }
);
/*sequelize.define returns a model. The same model is stored inside the sequelize.models.User(stored in sequelize object) == user */
module.exports = { user };
