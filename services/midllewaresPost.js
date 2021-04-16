// const { blogPosts } = require('../models');

const titleExists = (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: '"title" is required' });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

const contentExists = (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: '"content" is required' });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = {
  titleExists,
  contentExists,
};
