const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const result = blogs.reduce((accamulator, currentValue) => {
    return accamulator + currentValue.likes;
  }, 0);
  return result;
};

module.exports = { dummy, totalLikes };
