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
      allowNull: false, //constraint
      set(value) {
        this.setDataValue("firstName", value + "From India");
      }, // here value means in post/put/patch request when we send any data for the firstName e.g Chaitanya then this name will come here as a value and "from india" will get added at the end and stored in DB
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const lastNameValue = this.getDataValue("lastName");
        return lastNameValue ? lastNameValue.toUpperCase() : "No last name";
      }, // This is used when we get some data from DB and before sending it to the FE we want to do some modifications then we can do it here
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false, //constraint
      validate: {
        min: 18,
        max: 80,
      }, // this is how we can add multiple validators before sending data into database
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isPositive(value) {
          if (value < 0) {
            throw new Error("Invalid salary");
          }
        },
      }, // this is how we can create custom validator before sending data into DB
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
    validate: {
      checkLastNameAndSalary() {
        if (!this.lastName && !this.salary) {
          throw new Error("Either salary or lastname should be present");
        }
      }, // here we put validators which work on whole model
    },
  }
);
/*sequelize.define returns a model. The same model is stored inside the sequelize.models.User(stored in sequelize object) == user */
module.exports = { user };

/**......Validators and constraints...
 *
 * Validators are used before sending data into DB we want to do some checks.
 *
 * constraints are used to maintain the data intigrity
 */
