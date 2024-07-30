const User = require("../models/user");
const Blog = require("../models/blog");
const { createTokenForUser } = require("../service/auth");

const renderSignin = (req, res) => {
  return res.render("signin");
};

const renderSignup = (req, res) => {
  return res.render("signup");
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
};

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.render("signup", {
      error: "All fields are mandatory!",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", {
        error: "Email is already in use",
      });
    }

    await User.create({
      fullName,
      email,
      password,
    });

    return res.redirect("/");
  } catch (error) {
    return res.render("signup", {
      error: "An error occurred during signup",
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").redirect("/");
};

const renderMyAccount = (req, res) => {
  return res.render("myAccount", {
    user: req.user,
    error: null,
  });
};

const updateUser = async (req, res) => {
  const { fullName } = req.body;

  let profileImageURL = req.user.profileImageURL;
  if (req.file) {
    profileImageURL = `/images/${req.file.filename}`;
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, profileImageURL },
      { new: true, runValidators: true }
    );

    const token = createTokenForUser(user);
    res.cookie("token", token, { httpOnly: true });

    return res.redirect("/");
  } catch (error) {
    return res.render("myAccount", {
      user: req.user,
      error: "An error occurred while updating your information.",
    });
  }
};

const renderMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ createdBy: req.user._id });
    res.render("myBlogs", { user: req.user, blogs,  error: null });
  } catch (error) {
    res.render("myBlogs", { user: req.user, blogs: [], error: "Failed to fetch blogs" });
  }
};

const renderEditBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!blog) return res.redirect("/user/my-blogs");
    res.render("editBlog", { user: req.user, blog });
  } catch (error) {
    res.redirect("/user/my-blogs");
  }
};

const updateBlog = async (req, res) => {
  const { title, body } = req.body;

  let coverImageURL;
  if (req.file) {
    coverImageURL = `/uploads/${req.file.filename}`;
  }

  try {
    const updateFields = { title, body };
    if (coverImageURL) {
      updateFields.coverImageURL = coverImageURL;
    }

    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      updateFields,
      { new: true, runValidators: true }
    );
    res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    res.redirect(`/user/edit-blog/${req.params.id}`);
  }
};

const deleteBlog = async (req, res) => {
  try {
    await Blog.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    res.redirect("/user/my-blogs");
  } catch (error) {
    res.redirect("/user/my-blogs");
  }
};

module.exports = {
  renderSignin,
  renderSignup,
  signin,
  signup,
  logout,
  renderMyAccount,
  updateUser,
  renderMyBlogs,
  renderEditBlog,
  updateBlog,
  deleteBlog,
};
