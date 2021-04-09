const { Router } = require('express');
const CreateToken = require('../auth/CreateToken');
const LoginValidation = require('../middlewares/LoginValidation');

const LoginController = Router();

LoginController.post('/', LoginValidation, async (req, res) => {
  try {
    const { user } = req;
    const { password: passWord, ...userWithoutPassword } = user;
    return res.status(200).json({ token: CreateToken(userWithoutPassword) });
  } catch (e) {
    console.log(e.messsage, 'error');
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = LoginController;
