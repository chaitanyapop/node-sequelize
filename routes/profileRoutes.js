const { addProfile } = require("../controller/profileController");

const profileRouter = require("express").Router();

profileRouter.post("/addProfile", addProfile);

module.exports = { profileRouter };
