const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const result = blogs.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.likes;
  }, 0);
  return result;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const favourite = blogs.reduce(
    (max, currentValue) =>
      max.likes < currentValue.likes ? currentValue : max,
    blogs[0],
  );
  return favourite;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const blogsByAuthor = new Map();
  blogs.forEach((blog) => {
    blogsByAuthor.set(blog.author, (blogsByAuthor.get(blog.author) || 0) + 1);
  });

  let top = { author: "", blogs: 0 };
  blogsByAuthor.forEach((count, author) => {
    if (count > top.blogs) {
      top = { author, blogs: count };
    }
  });

  return top;
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs };
