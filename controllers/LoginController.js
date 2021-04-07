const { Router } = require('express');
const { loginWithEmailAndPass } = require('../services/UserSevice');
const token = require('../auth/createToken');
const { status } = require('../middlewares/errorMessage');
const { validateLogin } = require('../middlewares/loginVerification');

const LoginController = Router();

LoginController.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const [userData] = await loginWithEmailAndPass(email, password);
  const { id, displayName, email: userEmail, image } = userData.dataValues;
  const newToken = token({ id, displayName, userEmail, image });
  res.status(status.Ok).json({ token: newToken });
});

module.exports = LoginController;
