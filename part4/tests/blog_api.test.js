const { test, after, beforeEach, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);
beforeEach(async () => {
  const users = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/)

  // test("users already in database and got names and usernames", async () => {
  //   assert.ok(users.body[0].name, "User should have name")
  //   assert.ok(users.body[0].username, "User should have username")
  //   assert.ok(users.body[0]._id, "User should have _id")
  //   assert.ok(users.body[0].id, "User should have id")
  //   console.log("users: ", users)
  // })

  await Blog.deleteMany()

  const [min, max] = [0, users.body.length]
  const randUserIndex = () => Math.floor(Math.floor(Math.random() * (max - min)) + min)

  const blogObjects = testHelper.initialBlogs.map((blog) => new Blog({ ...blog, userId: users.body.at(randUserIndex()).id }));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
})

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
  const users = await api.get("/api/users");
  const userId = users.body[0].id;
  assert.ok(mongoose.isValidObjectId(userId), "valid userId as ObjectID");

  const blog = {
    title: "New blog post",
    author: "New author",
    url: "newblog.com",
    user: userId,
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
  const userId = (await api.get("/api/users")).body[0].id
  assert.ok(mongoose.isValidObjectId(userId), "valid userId as ObjectID");
  const blog = {
    title: "New blog post missing likes property",
    author: "New author",
    url: "newblog.com",
    user: userId
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

test("if title or url property is missing, results in Bad Request", async () => {
  const userId = (await api.get("/api/users")).body[0].id
  assert.ok(mongoose.isValidObjectId(userId), "valid userId as ObjectID");
  const blog_no_title = {
    author: "Missing Title",
    url: "missingtitle.com",
    user: userId
  };
  const blog_no_url = {
    title: "Missing url",
    author: "Missing Url",
    user: userId
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

test("delete blog post", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const IDtoDelete = (await api.get("/api/blogs")).body[0].id;
  assert.ok(IDtoDelete, "blog id to delete should exist")
  await api.delete(`/api/blogs/${IDtoDelete}`).expect(204)
  await api.get(`/api/blogs/${IDtoDelete}`).expect(404)
})

test("update a blog post", async () => {
  const userId = (await api.get("/api/users")).body[0].id
  assert.ok(mongoose.isValidObjectId(userId), "valid userId as ObjectID");
  const response = await api.get("/api/blogs");
  const blogToUpdate = response.body[0];

  assert.ok(blogToUpdate, "There should be at least one blog to update");

  const updatedData = {
    title: "Updated Title",
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 10,
    user: userId
  };

  const updateResponse = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const checkResponse = await api.get(`/api/blogs/${blogToUpdate.id}`);
  assert.strictEqual(updateResponse.body.title, updatedData.title);
  assert.strictEqual(updateResponse.body.likes, updatedData.likes);
});


after(async () => {
  await mongoose.connection.close();
});
