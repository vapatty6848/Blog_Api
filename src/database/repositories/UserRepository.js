const { User } = require('../models');

async function getAll() {
  const users = await User.findAll();
  return users;
}

async function findById(id) {
  const user = await User.findByPk(id);
  return user;
}

async function findByEmail(email) {
  const user = await User.findOne({
    where: { email },
  });
  return user;
}

async function update(id, data) {
  await User.update(data, {
    where: { id },
  });
}

async function create(data) {
  console.log('repositories', data);
  const { email, displayName, password, image } = data;
  const user = await User.create({ email, displayName, password, image });
  return user;
}

async function deleteById(id) {
  await User.destroy({ where: { id }, cascade: true });
}

module.exports = {
  getAll, findById, findByEmail, create, deleteById, update,
};
