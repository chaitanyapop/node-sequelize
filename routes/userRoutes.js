const {
  getAllUser,
  getUser,
  getSingleUser,
  insertUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const router = require("express").Router();

router.get("/getAllUser", getAllUser);
router.get("/getUser", getUser);
router.get("/getOneUser/:id", getSingleUser);
router.post("/addUser", insertUser);
router.patch("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);

module.exports = { router };
