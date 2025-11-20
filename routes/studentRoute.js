const {
  getAllStudents,
  getAllStudentAndCourse,
  addStudentAndEnroll,
} = require("../controller/studentController");

const studentRouter = require("express").Router();

studentRouter.get("/getAllStudent", getAllStudents);
studentRouter.get("/getStudentAndCourse", getAllStudentAndCourse);
studentRouter.post("/addStudentAndEnroll", addStudentAndEnroll);

module.exports = { studentRouter };
