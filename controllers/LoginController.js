const express = require('express');

const login = require('../Service/LoginValidation');
const tk = require('../Service/TokenCreate');

const loginRouter = express.Router();

loginRouter.post('/', login.passwordVerification, login.emailLoginVerification, async (req, res, _next) => {
  const { email, displayName, id } = req.kissyla;
  const token = tk.createToken({ displayName, email, id });
  return res.status(200).json({ token });
});

module.exports = loginRouter;
