const express = require("express");
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog");
const User = require("../models/user");

const blogRouter = express.Router();

const getTokenFrom = request => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "")
  }
  return null
}


blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 })
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const userId = req.body.user;

  let user = await User.findById(userId);
  if (!req.token) {
    return res.status(401).json({ error: "no token provided" })
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" })
  }

  if (!title || !url) {
    return res.status(400).json({ error: "Title and URL are required" });
  }

  if (!user) {
    return res.status(400).json({ error: "Bad user id or user missing" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (req, res) => {
  const token = req.token
  const userId = req.body.user;
  if (!token) {
    return res.status(401).json({ error: "no token provided" })
  }
  console.log("to jwt")
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const blog = await Blog.findOne({ user: userId })
  const user = await User.findById(userId)
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" })
  } else if (decodedToken.id !== blog.user.toString()) {
    return res.status(401).json({ error: "access restricted" })
  }
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

  if (deletedBlog) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Blog not found" });
  }
});

blogRouter.put("/:id", async (req, res) => {
  // ??? TODO: add user change
  const { title, author, likes, url } = req.body;
  if (!title && !author && !likes && !url) {
    return res.status(400).json({ error: "At least one field is required" });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, likes, url },
    { new: true, runValidators: true, context: "query" },
  );
  if (updatedBlog) {
    res.json(updatedBlog);
  } else {
    res.status(404).json({ error: "Blog not found" });
  }
});

module.exports = blogRouter;
