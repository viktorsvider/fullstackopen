const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Borrow checker in Rust",
    author: "Guido van Rossum",
    url: "blog.rust.com/borrow-checker",
    likes: 777,
  },
  {
    title: "Optional type in Rust comparing to functional languages",
    author: "Guido van Rossum",
    url: "blog.rust.com/optional-type-rust-comparing-to-functional-lang",
    likes: 234,
  },
  {
    title: "C++ 27 draft: semicolon overloading proposal",
    author: "Bjarne Stroustrup",
    url: "blog.cpp.com/cpp27draft",
    likes: 12,
  },
  {
    title: "Landing Falcon Heavy on Mars",
    author: "Elon Musk",
    url: "spacex.com/blog/landing-on-mars",
    likes: 1242,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "To be removed soon",
    author: "To be removed",
    url: "toberemoved.com",
    likes: 0,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

module.exports = { initialBlogs, blogsInDb, nonExistingId };
