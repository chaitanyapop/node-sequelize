const { user } = require("../model/userModel");
const { sequelize } = require("../config/dbConnection");
const { QueryTypes } = require("sequelize");
const { ProfileModel } = require("../model/profileModel");

/*res.status(200).json({ message: "user added successfully" }); only this will also sends the response but we use return because it
officially tells the function execution is completed and it stops the execution */

async function getAllUser(req, res, next) {
  try {
    const allUser = await user.findAll({
      include: {
        model: ProfileModel,
      } /*here we are saying when you send info about all the users include profile information as well about that user 
      where we did FK referencial integrity. profile will be another key in the repsonse of a particular user which will hold the dataa of the profile
      e.g - > 
      {
      "lastName": "P",
        "fullName": "chaitanyaFrom India P",
        "id": 2,
        "firstName": "chaitanyaFrom India",
        "age": 25,
        "salary": null,
        "profile": {
            "id": 1,
            "bio": "This is chaitanya's bio",
            "userId": 2
        }} */,
    });
    // const allUser = await sequelize.query("SELECT * FROM users", {
    //   type: QueryTypes.SELECT,
    //   mapToModel: true,
    // }); /*This is how we can write raw queries in sequelize. We have to mention type:QueryTypes.SELECT if we dont do it then it returns meta data as well and we need to destructure
    //Getter, Setter, Virtuals will not work for the raw query */
    res.status(200).json(allUser);
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  console.log("executing", req.body);
  try {
    // const users = await user.findAll({
    //   where: { firstName: req.body.firstName },
    // });
    const users = await sequelize.query(
      `SELECT * FROM users WHERE firstName = :firstName`,
      {
        type: QueryTypes.SELECT,
        replacements: { firstName: req.body.firstName }, // this is how we pass the value to the where clause. In this example "firstName"
      }
    );
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

// const users = await sequelize.query(
//       `SELECT * FROM users WHERE firstName = ${req.body.firstName}`
//     );
/*This is totally an incorrect plus dangerous way to get data from request parameter as it is vulnerable to 
SQL injection attack where FE can send firstName = "";"DROP TABLE users" therfore use replacements to add data or use ORM methods*/
