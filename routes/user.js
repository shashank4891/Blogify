  const express = require("express");
  const multer = require("multer");
  const path = require("path");
  const {
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
    deleteBlog
  } = require("../controllers/user");


  const router = express.Router();

  const profileImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/images/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

  const coverImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

  const uploadProfileImage = multer({ storage: profileImageStorage });
  const uploadCoverImage = multer({ storage: coverImageStorage });

  router.get("/signin", renderSignin);

  router.get("/signup", renderSignup);

  router.post("/signin", signin);

  router.post("/signup", signup);

  router.get("/logout", logout);

  router.get("/my-account", renderMyAccount);

  router.post("/my-account", uploadProfileImage.single("profileImage"), updateUser);

  router.get("/my-blogs", renderMyBlogs);

  router.get("/edit-blog/:id", renderEditBlog);

  router.post("/update-blog/:id", uploadCoverImage.single("coverImage"), updateBlog);

  router.post("/delete-blog/:id", deleteBlog);

  module.exports = router;
