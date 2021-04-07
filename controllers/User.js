const { Router } = require('express');
const { addUser } = require('../services/UserSevice');
const token = require('../auth/createToken');
const { status } = require('../middlewares/errorMessage');

const UserController = Router();

UserController.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await addUser(displayName, email, password, image);
  const newToken = token(newUser);
  res.status(status.Created).json({ token: newToken });
});

module.exports = UserController;
