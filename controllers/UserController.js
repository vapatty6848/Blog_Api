const UserController = require('express').Router();
const createToken = require('../authentication/createToken');
const { User, sequelize } = require('../models');

const status = require('../utils/HTTPStatus');

UserController.post('/', async (req, res) => {
  try {
    const userInfo = req.body;
    console.log(userInfo)
    const result = await sequelize.transaction(async (t) => {
      const newUser = User.create({ ...userInfo });
      console.log(newUser)

      const {
        id, password, ...userWithoutPassword
      } = newUser;

      const token = createToken(userWithoutPassword);
      console.log(token);
      res.status(status.OK).json({ token });
    });
  } catch {
    res.status(status.GEN_ERROR).json({ message: 'Something went wrong' });
  }
});

module.exports = UserController;
