const { BlogPosts, Sequelize } = require('../models');
const { userModel } = require('./PostServices');

const searchBlog = async (req, res) => {
  const { q } = req.query;
  const { Op } = Sequelize;

  const filteredSearch = q
    ? (await BlogPosts.findAll({
      where: { [Op.or]: { title: { [Op.regexp]: `${q}` }, content: { [Op.regexp]: `${q}` } } },
      include: userModel,
    }))
    : await BlogPosts.findAll({ include: userModel });

  return res.status(200).json(filteredSearch);
};

module.exports = {
  searchBlog,
};
