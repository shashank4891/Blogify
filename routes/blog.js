const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  renderAddNewBlog,
  getBlogById,
  addComment,
  createBlog,
} = require("../controllers/blog");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", renderAddNewBlog);

router.get("/:id", getBlogById);

router.post("/comment/:blogId", addComment);

router.post("/", upload.single("coverImage"), createBlog);

module.exports = router;
