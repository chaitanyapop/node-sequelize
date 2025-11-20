/*This file is mainly used to created the association within models */
const { user } = require("./model/userModel");
const { ProfileModel } = require("./model/profileModel");
const { BlogsModel } = require("./model/blogsModel");
const { StudentModel } = require("./model/studentModel");
const { CourseModel } = require("./model/courseModel");
user.hasOne(ProfileModel, {
  foreignKey: "userId",
});
ProfileModel.belongsTo(user, {
  foreignKey: "userId",
});

user.hasMany(BlogsModel, {
  foreignKey: "userId", // this means child table will be having userId column which refers to the parents PK
});
BlogsModel.belongsTo(user, {
  foreignKey: "userId", // this means child table will be having userId column which refers to the parents PK
});

StudentModel.belongsToMany(CourseModel, {
  through: "StudentCourse", // new table name created by sequelize,
  foreignKey: "studentId", // new table foreign key
});
CourseModel.belongsToMany(StudentModel, {
  through: "StudentCourse", // new table name created by sequelize,
  foreignKey: "courseId", // new table foreign key
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
