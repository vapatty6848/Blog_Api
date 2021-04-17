const { Router } = require('express');

const loginController = Router();

const validateLogin = require('../middlewares/validateLoginMiddleware');

const generateToken = require('../utils/generateToken');

loginController.post('/login', validateLogin, async (req, res) => {
  try {
    const token = generateToken(req.body);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
});

module.exports = loginController;
