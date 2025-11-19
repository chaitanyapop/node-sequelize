const { ProfileModel } = require("../model/profileModel");

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
