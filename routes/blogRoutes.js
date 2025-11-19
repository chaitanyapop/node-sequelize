const { addBlog } = require("../controller/blogsController");

const blogRouter = require("express").Router();

blogRouter.post("/addBlog", addBlog);

module.exports = { blogRouter };
