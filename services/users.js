const { User } = require('../models');

const findByEmail = async (email) => User.findOne({ where: { email } });

const loginUser = async (email, password) => User.findOne({ where: { email, password } });

const createUser = async (displayName, email, password, image) => (
  User.create({ displayName, email, password, image })
);

module.exports = { findByEmail, loginUser, createUser };
