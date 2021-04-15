const { Router } = require('express');
const { validateEmail, validatePassword, emailRepeat } = require('../middlewares/userValidations');
const { createToken } = require('../middlewares/auth');

const loginController = Router();

loginController.post('/', validateEmail, validatePassword, async (req, res) => {
  const { email } = req.body;
  const user = await emailRepeat(email);

  if (user === null) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }
  const token = createToken(user.displayName, email);
  return res.status(200).json({ token });
});

module.exports = loginController;
