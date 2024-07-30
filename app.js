const express = require("express");
const { connectToMongoDB } = require("./config/config");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");

// Load environment variables from .env file
dotenv.config();

// calling routes
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 8051;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

connectToMongoDB(process.env.DB_URL).then(() => {
  console.log("Connected to MongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
