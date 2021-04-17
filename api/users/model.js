const { Users } = require('../../models');

const findAll = (property, value) => Users.findAll({ where: { [property]: value } });

const create = ({ email, displayName, image, password }) =>
  Users.create({ email, displayName, image, password });

const getAll = () => Users.findAll();

const findById = (id) => Users.findByPk(id);

module.exports = { create, findAll, getAll, findById };
