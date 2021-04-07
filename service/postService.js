const { Op } = require('sequelize');
const { BlogPosts, Users } = require('../models');

const findAll = async (req, res) => {
  BlogPosts.findAll({
    include: [{
      model: Users, as: 'user', attributes: { exclude: ['password'] },
    }],
    attributes: { exclude: ['userId'] },
  })
    .then((answer) => res.status(200).json(answer))
    .catch((e) => res.status(500).json({ message: e.message }));
};

const findByTerm = async (req, res) => {
  const { q } = req.query;
  BlogPosts.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.substring]: q,
          },
        },
        {
          content: {
            [Op.substring]: q,
          },
        },
      ],
    },
    include: [{
      model: Users, as: 'user', attributes: { exclude: ['password'] },
    }],
    attributes: { exclude: ['userId'] },
  })
    .then((answer) => res.status(200).json(answer))
    .catch((e) => res.status(500).json({ message: e.message }));
};

const findBlogPosts = (req, res) => {
  try {
    const { q } = req.query;
    if (q === '') return findAll(req, res);
    return findByTerm(req, res);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  findBlogPosts,
};
