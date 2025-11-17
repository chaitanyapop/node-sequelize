const { user } = require("../model/userModel");

/*res.status(200).json({ message: "user added successfully" }); only this will also sends the response but we use return because it
officially tells the function execution is completed and it stops the execution */

async function getAllUser(req, res, next) {
  try {
    const allUser = await user.findAll();
    res.status(200).json(allUser);
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  console.log("executing", req.body);
  try {
    const users = await user.findAll({
      where: { firstName: req.body.firstName },
    });
    if (!users) {
      res.status(404).json({ message: "not found" });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    next(err);
  }
}

async function getSingleUser(req, res, next) {
  try {
    const singleUser = await user.findByPk(req.params.id);
    if (!singleUser) {
      res.status(404).json({ message: "not found" });
    } else {
      res.status(200).json(singleUser);
    }
  } catch (err) {
    next(err);
  }
}

async function insertUser(req, res, next) {
  //const { firstName, lastName, email } = req.body;
  try {
    const addUser = await user.create(req.body);
    res
      .status(201)
      .json({ message: "user created successfully", userDetails: addUser });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const updateUser = await user.findByPk(req.body.userId);
    if (!updateUser) {
      res.status(404).json({ message: "not found" });
    } else {
      await updateUser.update(req.body);
      res.status(200).json(updateUser);
    }
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const deleteUser = await user.findByPk(req.body.userId);
    if (!deleteUser) {
      res.status(404).json({ message: "not found" });
    } else {
      await deleteUser.destroy();
      res.status(200).json({ message: "user deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllUser,
  getUser,
  getSingleUser,
  insertUser,
  updateUser,
  deleteUser,
};

// router.get("/getAllUser");
// router.get("/getOneUser");
// router.post("/addUser", insertUser);
// router.patch("/updateUser");
// router.delete("/deleteUser");
