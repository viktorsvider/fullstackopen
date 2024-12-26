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

module.exports = { dummy, totalLikes, favouriteBlog };
