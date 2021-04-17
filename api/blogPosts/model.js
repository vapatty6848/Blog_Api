const { Op } = require('sequelize');
const { Users, BlogPosts } = require('../../models');

const findAll = (property, value) => BlogPosts.findAll({ where: { [property]: value } },
  { include: { model: Users, as: 'user' } });

const create = ({ content, title, userId }) => BlogPosts.create({ content, title, userId },
  { include: { model: Users, as: 'user' } });

const getAll = () => BlogPosts.findAll({ include: { model: Users, as: 'user' } });

const findById = (id) => BlogPosts.findByPk(id, { include: { model: Users, as: 'user' } });

const search = (query) => BlogPosts.findAll({
  where: {
    [Op.or]: [{ content: { [Op.substring]: query } }, { title: { [Op.substring]: query } }],
  },
  include: { model: Users, as: 'user' },
});

module.exports = { create, findAll, getAll, findById, search };
