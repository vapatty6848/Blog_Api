const { Router } = require('express');
const { User } = require('../models');
const tokenCreator = require('../auth/tokenCreator');
const { BAD_REQUEST, SUCCESS } = require('../services/httpStatuses');
const { emailValidator } = require('../services/validator');
const { invalidEntries } = require('../services/messages');

const LoginController = new Router();

LoginController.post('/', async (req, res) => {
  const { email: loggingEmail, password } = req.body;
  if (loggingEmail === '') {
    return res.status(BAD_REQUEST).json(
      { message: '"email" is not allowed to be empty' },
    );
  }
  if (password === '') {
    return res.status(BAD_REQUEST).json(
      { message: '"password" is not allowed to be empty' },
    );
  }
  if (!loggingEmail) { return res.status(BAD_REQUEST).json({ message: '"email" is required' }); }
  if (!password) { return res.status(BAD_REQUEST).json({ message: '"password" is required' }); }
  const isEmailValid = emailValidator(loggingEmail);
  const isEmailRegistered = await User.findOne({ where: { email: loggingEmail } });
  if (isEmailRegistered === null) {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }
  if (isEmailValid) {
    const { id, displayName, image, email } = isEmailRegistered;
    const token = tokenCreator({ id, displayName, image, email });
    return res.status(SUCCESS).json({ token });
  }
});

module.exports = LoginController;
