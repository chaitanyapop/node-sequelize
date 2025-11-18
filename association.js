/*This file is mainly used to created the association within models */
const { user } = require("./model/userModel");
const { ProfileModel } = require("./model/profileModel");

user.hasOne(ProfileModel, {
  foreignKey: "userId",
});
ProfileModel.belongsTo(user, {
  foreignKey: "userId",
});
/**NOTES...
 * user.hasOne(ProfileModel, {
  foreignKey: "userId",
});
user model has one to one association with ProfileModel. ProfileModel will be having the FK which is dependent on the user model's PK.
The above way tells sequelize the connection of user model with the ProfileModel.

Now we have to tell the sequelize the connection of ProfileModel with user model
ProfileModel.belongsTo(user, {
  foreignKey: "userId",
});

Both ways we have to mention 

 */
