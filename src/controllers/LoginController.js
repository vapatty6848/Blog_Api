const Router = require('express');
const AppError = require('../error/AppError');
const validateLogin = require('../middlewares/validations/validateLogin');
const UserService = require('../services/UserServices');

const LoginController = Router();

LoginController.post('/', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.login({ email, password });
    res.status(200).json({ token, message: 'somemsg' });
  } catch (err) {
    console.log(err, 'login error');
    next(AppError('Campos inválidos', err.status));
  }
});

module.exports = LoginController;
