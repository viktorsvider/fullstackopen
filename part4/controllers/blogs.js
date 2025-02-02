const express = require("express");
const Blog = require("../models/blog");

const blogRouter = express.Router();

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;
    if (!title || !url) {
      return response.status(400).json({ error: "Title and URL are required" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
    });

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});


blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const deletedNote = await Person.findByIdAndDelete(request.params.id)
    if (deletedNote) {
      response.status(204).end()
    } else {
      response.status(404).send({ error: 'Document not found' })
    }
  }
  catch {
    next(error)
  }
})

module.exports = blogRouter;
