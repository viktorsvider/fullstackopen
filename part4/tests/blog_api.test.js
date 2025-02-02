const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany();

  const blogObjects = testHelper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, testHelper.initialBlogs.length);
});

test("unique property of blog post is named id not _id", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  assert.ok(response.body[0].id, "id should exist");
  assert.strictEqual(response.body[0]._id, undefined, "_id should not exist");
});

test("making HTTP POST creates a new blog post", async () => {
  const blog = {
    title: "New blog post",
    author: "New author",
    url: "newblog.com",
    likes: 0,
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  const postedBlog = response.body.at(-1);
  assert.deepStrictEqual(postedBlog.title, blog.title);
  assert.deepStrictEqual(postedBlog.author, blog.author);
  assert.deepStrictEqual(postedBlog.url, blog.url);
  assert.deepStrictEqual(postedBlog.likes, blog.likes);
  assert.strictEqual(response.body.length, testHelper.initialBlogs.length + 1);
});

test("if likes property is missing, it will default to 0", async () => {
  const blog = {
    title: "New blog post missing likes property",
    author: "New author",
    url: "newblog.com",
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  const postedBlog = response.body.at(-1);
  assert.deepStrictEqual(postedBlog.title, blog.title);
  assert.deepStrictEqual(postedBlog.author, blog.author);
  assert.deepStrictEqual(postedBlog.url, blog.url);
  assert.deepStrictEqual(postedBlog.likes, 0);
});

test("if likes property is missing, it will default to 0", async () => {
  const blog_no_title = {
    author: "Missing Title",
    url: "missingtitle.com",
  };
  const blog_no_url = {
    title: "Missing url",
    author: "Missing Url",
  };
  await api
    .post("/api/blogs")
    .send(blog_no_title)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  await api
    .post("/api/blogs")
    .send(blog_no_url)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});
