const { Op } = require('sequelize');
const { BlogPost, User } = require('../../models');

const getByTextController = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: {
          [Op.substring]: `%${q}%` },
        },
        { content: {
          [Op.substring]: `%${q}%` },
        },
      ],
    },
    include: {
      model: User, as: 'user',
    },
  });
  res.status(200).json(posts);
};

module.exports = getByTextController;
