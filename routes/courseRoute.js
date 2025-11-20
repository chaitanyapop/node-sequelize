const {
  getAllCourses,
  getAllCourseAndStudent,
  addCourses,
} = require("../controller/courseController");

const courseRouter = require("express").Router();

courseRouter.get("/getAllCourses", getAllCourses);
courseRouter.get("/getCourseAndStudents", getAllCourseAndStudent);
courseRouter.post("/addCourse", addCourses);

module.exports = { courseRouter };
