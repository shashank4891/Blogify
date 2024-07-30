const User = require("../models/user");
const Blog = require("../models/blog");
const bucket = require("../config/gcs");
const { v4: uuidv4 } = require("uuid");
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

// Helper function to upload a file to Google Cloud Storage
const uploadFileToGCS = (file) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(`${uuidv4()}-${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      console.error(err);
      reject("An error occurred while uploading the image.");
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};

const updateUser = async (req, res) => {
  const { fullName } = req.body;
  let profileImageURL = req.user.profileImageURL;

  try {
    if (req.file) {
      profileImageURL = await uploadFileToGCS(req.file);
    }

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
      error:
        error.message || "An error occurred while updating your information.",
    });
  }
};

const renderMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ createdBy: req.user._id });
    res.render("myBlogs", { user: req.user, blogs, error: null });
  } catch (error) {
    res.render("myBlogs", {
      user: req.user,
      blogs: [],
      error: "Failed to fetch blogs",
    });
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

  try {
    let coverImageURL;
    if (req.file) {
      coverImageURL = await uploadFileToGCS(req.file);
    }

    const updateFields = { title, body };
    if (coverImageURL) {
      updateFields.coverImageURL = coverImageURL;
    }

    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      updateFields,
      { new: true, runValidators: true }
    );

    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error(error);
    return res.redirect(`/user/edit-blog/${req.params.id}`);
  }
};


const deleteBlog = async (req, res) => {
  try {
    await Blog.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
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
