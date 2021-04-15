const { BlogPosts, User, Sequelize } = require('../models');

const searchBlog = async (req, res) => {
  const { q } = req.query;
  const { Op } = Sequelize;

  const userModel = {
    model: User,
    as: 'user',
    attributes: ['id', 'displayName', 'email', 'image'],
  };

  const filteredSearch = q
    ? (await BlogPosts.findAll({
      where: {
        [Op.or]: { title: { [Op.regexp]: `${q}` }, content: { [Op.regexp]: `${q}` } },
      },
      include: userModel,
    }))
    : await BlogPosts.findAll({ include: userModel });
  return res.status(200).json(filteredSearch);
};

module.exports = {
  searchBlog,
};
