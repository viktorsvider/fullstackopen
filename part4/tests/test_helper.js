const Blog = require("../models/blog");

const initialUsers = [
  {
    name: "Jeffrey Smith",
    username: "jsmith",
    password: "liljjsecret"
  },
  {
    name: "Gwern Bwerhen",
    username: "gwern",
    password: "sVs12_!aDs$"
  },
  {
    name: "Guido van Rossum",
    username: "guido",
    password: "python2over3"
  },
  {
    name: "Bjarne Stroustrup",
    username: "bjarne_genius",
    password: "constexpr_template<T>(T)[T]{T}"
  }
]

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

module.exports = { initialBlogs, initialUsers, blogsInDb, nonExistingId };
