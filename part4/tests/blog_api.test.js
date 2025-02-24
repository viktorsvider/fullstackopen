const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const api = supertest(app);


beforeEach(async () => {
  await User.deleteMany();
  const userObjects = await Promise.all(
    testHelper.initialUsers.map(async (user) => {
      const passwordHash = await bcrypt.hash(user.password, 10);
      return new User({
        name: user.name,
        username: user.username,
        passwordHash,
      });
    })
  );

  const savedUsers = await Promise.all(userObjects.map((user) => user.save()));

  const usersResponse = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  await Blog.deleteMany();
  const users = usersResponse.body;
  const [min, max] = [0, users.length];
  const randUserIndex = () => Math.floor(Math.random() * (max - min)) + min;

  const promiseArray = testHelper.initialBlogs.map(async (blog) => {
    const randomUser = users[randUserIndex()];

    const userObjectId = new mongoose.Types.ObjectId(randomUser.id);

    const newBlog = new Blog({
      ...blog,
      user: userObjectId,
    });

    const savedBlog = await newBlog.save();

    await User.findByIdAndUpdate(userObjectId, {
      $push: { blogs: savedBlog._id },
    });

    return savedBlog;
  });

  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  assert.strictEqual(
    response.body.length,
    testHelper.initialBlogs.length,
    "equal blog number in database and test",
  );
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
  const user = testHelper.initialUsers[0];
  const loginResponse = await api
    .post("/api/login")
    .send(user)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const token = loginResponse.body.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const userId = decodedToken.id;

  const blog = {
    title: "New blog post",
    author: "New author",
    url: "newblog.com",
    user: userId,
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .set("authorization", `Bearer ${token}`)
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const postedBlog = response.body.at(-1);
  assert.strictEqual(postedBlog.title, blog.title, "equal titles");
  assert.strictEqual(postedBlog.author, blog.author, "equal author");
  assert.strictEqual(postedBlog.url, blog.url, "equal url");
  assert.strictEqual(postedBlog.likes, blog.likes, "equal likes");
  assert.strictEqual(response.body.length, testHelper.initialBlogs.length + 1, "equal number of blogs");
});

test("if likes property is missing, it will default to 0", async () => {
  const user = testHelper.initialUsers[0];
  const token = (await api
    .post("/api/login")
    .send(user)
    .expect(200)
    .expect("Content-Type", /application\/json/)).body.token


  const userId = (await api.get("/api/users")).body[0].id;
  assert.ok(mongoose.isValidObjectId(userId), "valid userId as ObjectID");
  const blog = {
    title: "New blog post missing likes property",
    author: "New author",
    url: "newblog.com",
    user: userId,
  };

  await api
    .post("/api/blogs")
    .set('authorization', `Bearer ${token}`)
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
  const user = testHelper.initialUsers[0];
  const token = (await api
    .post("/api/login")
    .send(user)
    .expect(200)
    .expect("Content-Type", /application\/json/)).body.token

  const userId = (await api.get("/api/users")).body[0].id;
  assert.ok(mongoose.isValidObjectId(userId), "valid userId as ObjectID");
  const blog_no_title = {
    author: "Missing Title",
    url: "missingtitle.com",
    user: userId,
  };
  const blog_no_url = {
    title: "Missing url",
    author: "Missing Url",
    user: userId,
  };
  await api
    .post("/api/blogs")
    .set("authorization", `Bearer ${token}`)
    .send(blog_no_title)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  await api
    .post("/api/blogs")
    .set("authorization", `Bearer ${token}`)
    .send(blog_no_url)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("delete blog post", async () => {
  const userWithPost = await User.findOne({ blogs: { $ne: [] } })
  const userId = userWithPost.id
  const user = testHelper.initialUsers.find(user => user.username === userWithPost.username)

  assert.ok(user, "user doesn't exist")

  const loginResponse = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password })
    .expect(200)
    .expect("Content-Type", /application\/json/)
  const token = `Bearer ${loginResponse.body.token}`

  const IDtoDelete = userWithPost.blogs[0].toString()
  assert.ok(IDtoDelete, "blog id to delete should exist");
  await api
    .delete(`/api/blogs/${IDtoDelete}`)
    .set("authorization", token)
    .send({ user: userId })
    .expect(204);
  await api.get(`/api/blogs/${IDtoDelete}`).expect(404);
});

test("update a blog post", async () => {
  const userId = (await api.get("/api/users")).body[0].id;
  assert.ok(mongoose.isValidObjectId(userId), "valid userId as ObjectID");
  const response = await api.get("/api/blogs");
  const blogToUpdate = response.body[0];

  assert.ok(blogToUpdate, "There should be at least one blog to update");

  const updatedData = {
    title: "Updated Title",
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 10,
    user: userId,
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
