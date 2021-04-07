const { Router } = require('express');
const { User } = require('../models');
const comebackResponse = require('../util/comebackResponse');
const messages = require('../util/returnedMessages');
const createToken = require('../auth/createToken');

const LoginController = Router();

LoginController.post('/', async (req, res) => {
  const { email } = req.body;
  const [foundUser] = await User.findAll({ where: { email } });
  if(!foundUser || foundUser.dataValues.password !== req.body.password) return comebackResponse(res, 400, messages.invalidFields);
  
  const { dataValues } = foundUser;
  const { password, ...userWithoutPassword } = dataValues;
  const token = createToken(userWithoutPassword);
  return res.status(200).json({ token });
});

module.exports = LoginController;
