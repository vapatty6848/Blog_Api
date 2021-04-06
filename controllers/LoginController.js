const { Router } = require('express');

const LoginController = Router();

const { User } = require('../models');
const createToken = require('../auth/createToken');
const { validateEmail, validatePassword } = require('../middlewares/userValidation');

LoginController.post('/', validateEmail, validatePassword, async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ where: { email, password } });
  // console.log(userFound.dataValues);

  if (!userFound) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }
  const { displayName, image } = userFound.dataValues;
  const generatedToken = createToken({ displayName, email, image });

  res.status(200).json({ token: generatedToken });
});

module.exports = LoginController;
