const { blogPosts } = require('../models');

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

const blogpostExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idDb = await blogPosts.findOne({ where: { id } });
    if (!idDb) {
      return res.status(404).json({ message: 'Post não existe' });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = {
  titleExists,
  contentExists,
  blogpostExists,
};
