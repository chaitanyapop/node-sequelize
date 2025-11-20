const { CourseModel } = require("../model/courseModel");
const { StudentModel } = require("../model/studentModel");

async function getAllCourses(req, res, next) {
  try {
    const courses = await CourseModel.findAll();
    res.status(200).json(courses);
  } catch (err) {
    next(err);
  }
}

async function getAllCourseAndStudent(req, res, next) {
  try {
    const courseStudent = await CourseModel.findAll({
      include: {
        model: StudentModel,
      },
    });
    res.status(200).json(courseStudent);
  } catch (err) {
    next(err);
  }
}

async function addCourses(req, res, next) {
  try {
    const createdCourse = await CourseModel.create(req.body);
    res.status(201).json({ message: "course added successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllCourses, getAllCourseAndStudent, addCourses };
