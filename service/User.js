const { User } = require('../models');

const create = (newUser) => {
  User.create(newUser)
}