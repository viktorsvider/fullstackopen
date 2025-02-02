const express = require("express");
const Blog = require("../models/blog");

const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: "Title and URL are required" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
  });
  const savedBlog = await blog.save();
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
