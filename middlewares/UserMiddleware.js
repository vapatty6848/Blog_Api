const { User } = require('../models');

const SUCESS = 200;
const NOT_FOUND = 404;

const getAllUsers = (req, res) => {
  User.findAll({ attributes: { exclude: ['password'] } })
    .then((users) => res.status(SUCESS).json(users))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;

  User.findByPk(id, { attributes: { exclude: ['password'] } })
    .then((user) => {
      if (user === null) {
        return res.status(NOT_FOUND).send({ message: 'Usuário não existe' });
      }
      return res.status(SUCESS).json(user);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
};

const deleteUser = (req, res) => {
  User.destroy({ where: { id: req.userId } })
    .then(() => res.status(204).send())
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

const createUser = (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  User.create({ displayName, email, password, image })
    .then(() => {
      req.status = 201;

      next();
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
};
