const { Router } = require('express');
const { User } = require('../models');
const { generateToken } = require('../services/GenerateToken');

const LoginController = new Router();
const SUCCESS = 200;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

LoginController.post('/', (req, res) => {
  const { password, email } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      if (user.password === password) {
        const token = generateToken(email, password);
        return res.status(SUCCESS).json({ token });
      }
      const message = 'Campos inválidos';
      return res.status(BAD_REQUEST).json({ message });
    })
    .catch((error) => {
      const message = 'Unexpected Error!';

      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({ message });
    });
});

module.exports = LoginController;
