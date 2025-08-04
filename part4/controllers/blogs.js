const express = require("express");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;

  if (!req.token) {
    return res.status(401).json({ error: "no token provided" });
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  let user = await User.findById(decodedToken.id);
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
    user: decodedToken.id,
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "no token provided or invalid" });
  }

  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() === req.user.id) {
    await Blog.findByIdAndDelete(req.params.id);
    return res.status(204).end();
  } else if (blog.user.toString() !== req.user.id) {
    return res.status(401).json({ error: "access restricted" });
  }
});

blogRouter.put("/:id", async (req, res) => {
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
