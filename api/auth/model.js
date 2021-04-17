const { Users } = require('../../models');

const findOne = (property, value) => Users.findOne({ where: { [property]: value } });

module.exports = { findOne };
