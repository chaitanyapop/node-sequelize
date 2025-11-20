const { CourseModel } = require("../model/courseModel");
const { StudentModel } = require("../model/studentModel");

async function getAllStudents(req, res, next) {
  try {
    const students = await StudentModel.findAll();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
}

async function getAllStudentAndCourse(req, res, next) {
  try {
    const studentCourse = await StudentModel.findAll({
      include: {
        model: CourseModel,
      },
    });
    res.status(200).json(studentCourse);
  } catch (err) {
    next(err);
  }
}

async function addStudentAndEnroll(req, res, next) {
  try {
    const { name, email, courseId } = req.body;
    const createdStudent = await StudentModel.create({ name, email });
    const course = await CourseModel.findByPk(courseId);
    await createdStudent.addCourse(
      course
    ); /*now we did in student similarly we can do in course where we have to do course.addStudent()
    these methods comes by default add"model name to which it belongs" createdStudent.addCourse(course) means student.
    This addCourse creates a connection between the student which we created and the course ID we given*/
    res.status(201).json({ message: "student added and enrolled" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllStudents,
  getAllStudentAndCourse,
  addStudentAndEnroll,
};

/**
 * await student.addCourse(course); from where I am getting this addCourse method ? if I do same in course table then I will be having addStudent/addStudents ?
 * 
 * Great question — and this is the **core magic of Sequelize associations**.

Let me explain where `addCourse`, `addStudent`, `getCourses`, etc. come from.

---

# ✅ **WHERE DOES `addCourse()` COME FROM?**

You get this method **automatically** from Sequelize when you define this:

```js
Student.belongsToMany(Course, {
  through: "StudentCourse",
  foreignKey: "studentId",
});
```

Because of this association, Sequelize dynamically generates helper functions on the **Student instance**.

---

# 🎁 **Automatically created methods for belongsToMany**

### If you write:

```js
Student.belongsToMany(Course, { through: "StudentCourse" });
```

Then Sequelize attaches these methods to **each Student instance**:

### 👇 Generated for Student:

| Method            | Meaning                               |
| ----------------- | ------------------------------------- |
| `addCourse()`     | Add one course for this student       |
| `addCourses()`    | Add multiple courses                  |
| `getCourses()`    | Get all courses of a student          |
| `setCourses()`    | Replace all student courses           |
| `removeCourse()`  | Remove ONE course                     |
| `removeCourses()` | Remove many courses                   |
| `hasCourse()`     | Check if student enrolled in a course |
| `countCourses()`  | Count how many courses                |

---

# 🎓 Example:

```js
const student = await Student.findByPk(1);
const course = await Course.findByPk(2);

await student.addCourse(course);  // <-- auto-generated!
```

Sequelize handles inserting into the join table:

```
INSERT INTO StudentCourse (studentId, courseId) VALUES (1, 2)
```

---

# 🔁 **Similarly, for Course.belongsToMany(Student)**

```js
Course.belongsToMany(Student, {
  through: "StudentCourse",
  foreignKey: "courseId",
});
```

Now **every Course instance** gets the opposite methods:

### 👇 Generated for Course:

| Method            | Meaning                       |
| ----------------- | ----------------------------- |
| `addStudent()`    | Adds a student to this course |
| `addStudents()`   | Add multiple                  |
| `getStudents()`   | All students in this course   |
| `removeStudent()` | Remove one student            |
| `hasStudent()`    | Check if a student enrolled   |
| `countStudents()` | Count students                |

---

# 🎉 Example:

```js
const course = await Course.findByPk(2);
const student = await Student.findByPk(1);

await course.addStudent(student);   // ALSO works!
```

This inserts:

```
studentId = 1
courseId = 2
```

Same result as student.addCourse().

---

# 🧠 **Important Understanding**

### ❗ You get BOTH sets of methods if BOTH sides use belongsToMany.

```js
Student.belongsToMany(Course, ...);
Course.belongsToMany(Student, ...);
```

Then:

### Student instance has:

* addCourse
* getCourses
* removeCourse

### Course instance has:

* addStudent
* getStudents
* removeStudent

---

# 🧡 EASY WAY TO REMEMBER

* `Student.belongsToMany(Course)` → student gets **course-related methods**
* `Course.belongsToMany(Student)` → course gets **student-related methods**

---

# ✔ Final Answer

### **Yes — Student gets `addCourse()` automatically.

And Course gets `addStudent()` automatically.**

Both come from the belongsToMany association.

---

# If you want, I can show:

👉 Methods generated for hasOne, hasMany, belongsTo
👉 How to see ALL auto-generated methods for a model
👉 How to add custom fields in join table (grade, enrolledDate)

Just tell me!

 */
