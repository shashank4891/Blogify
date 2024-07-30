  const express = require("express");
  const multer = require("multer");
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

  const uploadMemoryStorage = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed"), false);
      }
    },
  });

  router.get("/signin", renderSignin);

  router.get("/signup", renderSignup);

  router.post("/signin", signin);

  router.post("/signup", signup);

  router.get("/logout", logout);

  router.get("/my-account", renderMyAccount);

  router.post("/my-account", uploadMemoryStorage.single("profileImage"), updateUser);

  router.get("/my-blogs", renderMyBlogs);

  router.get("/edit-blog/:id", renderEditBlog);

  router.post("/update-blog/:id", uploadMemoryStorage.single("coverImage"), updateBlog);

  router.post("/delete-blog/:id", deleteBlog);

  module.exports = router;
