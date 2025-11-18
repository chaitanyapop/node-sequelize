const { ProfileModel } = require("../model/profileModel");
const { sequelize } = require("../config/dbConnection");

async function addProfile(req, res, next) {
  try {
    const addUser = await ProfileModel.create(req.body);
    res.status(201).json({
      message: "user profile created successfully",
      userDetails: addUser,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { addProfile };
