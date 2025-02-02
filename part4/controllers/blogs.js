const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response, next) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  }).catch(error => next(error));
});

blogRouter.post("/", (request, response, next) => {
  const blogObject = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  };
  const blog = new Blog(blogObject);
  blog.save().then((result) => {
    response.status(201).json(result);
  }).catch(error => next(error));
});

module.exports = blogRouter;
