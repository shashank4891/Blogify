const Blog = require("../models/blog");
const Comment = require("../models/comment");
const path = require("path");

const renderAddNewBlog = (req, res) => {
  return res.render("addBlog", {
    user: req.user,
    error: null,
  });
};

const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
};

const addComment = async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
};

const createBlog = async (req, res) => {
  const { title, body } = req.body;

  if (!req.file || !title || !body) {
    return res.render("addBlog", {
      user: req.user,
      error: "All fields are mandatory!",
    });
  }

  try {
    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors)
        .map((e) => e.message)
        .join(", ");
      return res.render("addBlog", {
        user: req.user,
        error: `Validation Error: ${errorMessages}`,
      });
    } else {
      return res.render("addBlog", {
        user: req.user,
        error: "An error occurred while creating the blog post.",
      });
    }
  }
};

module.exports = {
  renderAddNewBlog,
  getBlogById,
  addComment,
  createBlog,
};
