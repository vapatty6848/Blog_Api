const UserRepository = require('../database/repositories/UserRepository');
const AppError = require('../error/AppError');
const generateToken = require('../utils/generateToken');

async function getUserById(id) {
  return UserRepository.findById(id);
}

async function getUserByEmail(email) {
  const user = await UserRepository.findByEmail(email);
  return user;
}

async function login(userData) {
  const { email, password } = userData;
  try {
    const user = await getUserByEmail(email);
    const { password: dataPass, ...notSensitiveData } = user.dataValues;
    if (dataPass === password) {
      const token = generateToken(notSensitiveData);
      return token;
    }
    throw AppError('not authorized', 401);
  } catch (err) {
    throw AppError('not authorized', 400);
  }
}

async function getAllUsers(id) {
  try {
    const [...users] = await UserRepository.getAll();
    const mapedUsers = users.map((user) => ({
      displayName: user.dataValues.displayName,
      image: user.dataValues.image,
      email: user.dataValues.email,
      id: user.dataValues.id,
    }));
    console.log(mapedUsers, '--maped');
    return mapedUsers;
  } catch (err) {
    console.log(err);
    throw AppError('not authorized', 401);
  }
}

async function updateUser(id, userData) {
  return UserRepository.update(id, userData);
}

async function createUser(data) {
  return UserRepository.create(data);
}

async function deleteUserById(id) {
  return UserRepository.deleteById(id);
}

module.exports = {
  createUser, deleteUserById, updateUser, getAllUsers, getUserById, getUserByEmail, login,
};
