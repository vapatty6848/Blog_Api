const { BlogPosts } = require('../models');

const checkPostId = async (req, res, next) => {
  const { id } = req.params;
  const userid = await BlogPosts.findAll({
    where: {
      id,
    },
  });
  if (userid.length === 0) return res.status(401).json({ message: 'Post não existe' });
  next();
};

module.exports = checkPostId;
