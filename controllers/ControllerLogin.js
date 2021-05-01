const { Router } = require('express');
const { User } = require('../models');
const { createToken } = require('../services/CreateToken');

const ControllerLogin = new Router();
const success = 200;
const badRequest = 400;
const intServerError = 500;

ControllerLogin.post('/', (req, res) => {
  const { password, email } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      if (user.password === password) {
        const token = createToken(email, password);
        return res.status(success).json({ token });
      }
      const message = 'Campos inválidos';
      return res.status(badRequest).json({ message });
    })
    .catch((error) => {
      const message = 'Unexpected Error!';

      console.log(error);
      return res.status(intServerError).json({ message });
    });
});

module.exports = ControllerLogin;
