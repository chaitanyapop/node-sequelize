const { BlogsModel } = require("../model/blogsModel");

async function addBlog(req, res, next) {
  try {
    const addBlog = await BlogsModel.create(req.body);
    res.status(201).json({
      message: "blog created successfully",
      userDetails: addBlog,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { addBlog };
