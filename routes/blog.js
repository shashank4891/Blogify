const express = require("express");
const multer = require("multer");

const {
  renderAddNewBlog,
  getBlogById,
  addComment,
  createBlog,
} = require("../controllers/blog");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

router.get("/add-new", renderAddNewBlog);

router.get("/:id", getBlogById);

router.post("/comment/:blogId", addComment);

router.post("/", upload.single("coverImage"), createBlog);

module.exports = router;
