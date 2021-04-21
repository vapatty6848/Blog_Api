const { BlogPost } = require('../models');

const getPostByIdValidation = async (req, res, next) => {
  const { id } = req.params;
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) return res.status(404).json({ message: 'Post não existe' });
  next();
};

module.exports = getPostByIdValidation;
