const { BlogPosts } = require('../models');

const checkSearch = async (req, res, next) => {
  const { q } = req.query;

  if (!q) {
    const all = await BlogPosts.findAll({
      include: { association: 'user', attributes: { exclude: ['password'] } },
    });
    return res.status(200).json(all);
  }
  next();
};

module.exports = checkSearch;
