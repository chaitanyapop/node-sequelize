const { insertUser } = require("../controller/userController");

const router = require("express").Router();

router.post("/addUser", insertUser);

module.exports = { router };
