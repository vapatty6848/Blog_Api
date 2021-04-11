const { BlogPost } = require('../models');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  const post = await BlogPost.findOne({
    where: { id },
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  next();
};
