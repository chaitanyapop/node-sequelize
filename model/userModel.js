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
      set(value) {
        this.setDataValue("firstName") + "From India";
      }, // here value means in post/put/patch request when we send any data for the firstName e.g Chaitanya then this name will come here as a value and "from india" will get added at the end and stored in DB
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const lastNameValue = this.getDataValue("lastName");
        return lastNameValue ? lastNameValue.toUpperCase() : "No last name";
      },
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        const fullName =
          this.getDataValue("firstName") + " " + this.getDataValue("lastName");
        return fullName;
      },
      set(value) {
        throw new Error("Value cannot be set for the virtual fields");
      },
    }, // this is the virtual field and this will not be having any impact on DB. It is just for the FE and BE purpose no intentions to change DB
  },
  {
    //freezeTableName: true, //means the model name and the table name will be same
    tableName: "users", // use this table name for model User
    timestamps: false, // when it creates table it adds two extra column createdAt and updatedAt to not to have them we have to mention this and if we want only one of them then also we can do it refer doc
  }
);
/*sequelize.define returns a model. The same model is stored inside the sequelize.models.User(stored in sequelize object) == user */
module.exports = { user };
