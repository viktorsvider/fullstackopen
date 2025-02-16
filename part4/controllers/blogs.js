const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const userId = req.body.userId
  if (!title || !url) {
    return res.status(400).json({ error: "Title and URL are required" });
  }

  let user = await User.findById(userId)

  console.log(userId, req.body)
  let users = await User.find({})
  console.log(users)
  if (!user) {
    return res.status(400).json({ error: "Bad user id or user missing" })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user.id
  });
  const savedBlog = await blog.save();

  // update  blogs info
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()
  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (req, res) => {
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  if (deletedBlog) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Blog not found" });
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
    { new: true, runValidators: true, context: "query" }
  );
  if (updatedBlog) {
    res.json(updatedBlog);
  } else {
    res.status(404).json({ error: "Blog not found" });
  }
});

module.exports = blogRouter;
