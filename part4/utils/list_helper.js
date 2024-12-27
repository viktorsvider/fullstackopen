const _ = require("lodash");

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
  if (blogs.length === 0) return null;
  const authorsCount = _.countBy(blogs, "author");
  const topAuthor = _.maxBy(
    Object.entries(authorsCount),
    ([author, count]) => count,
  );

  const [author, count] = topAuthor;
  return { author, count };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const likesByAuthor = _.reduce(
    blogs,
    (result, blog) => {
      result[blog.author] = (result[blog.author] || 0) + blog.likes;
      return result;
    },
    {},
  );

  const topAuthor = _.maxBy(
    Object.entries(likesByAuthor),
    ([author, likes]) => likes,
  );

  const [author, likes] = topAuthor;
  return { author, likes };
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
