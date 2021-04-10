const UserServices = require('../services/UserServices');
const { SUCESS, CREATED, NO_CONTENT, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('./httpStatus');

const getAllUsers = async (req, res) => {
  try {
    const users = await UserServices.getAllUsers();

    res.status(SUCESS).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Algo deu errado' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userById = await UserServices.getUserById(id);

    if (userById === null) {
      return res.status(NOT_FOUND).send({ message: 'Usuário não existe' });
    }

    return res.status(SUCESS).json(userById);
  } catch (e) {
    console.log(e.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'Algo deu errado' });
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserServices.deleteUser(req.userId);

    res.status(NO_CONTENT).send();
  } catch (e) {
    console.log(e.message);
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Algo deu errado' });
  }
};

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  try {
    await UserServices.createUser(displayName, email, password, image);

    req.status = CREATED;

    next();
  } catch (e) {
    console.log(e.message);
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Algo deu errado' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
};
