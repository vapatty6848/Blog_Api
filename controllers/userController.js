const { Router } = require('express');
const models = require('../models');
const auth = require('../middlewares/auth');
const { validateRegister } = require('../middlewares/validateRegister');

const NOT_FOUND = 404;
const CONFLICT = 409;
const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;

const UserRouter = new Router();

UserRouter.post('/', validateRegister, async (req, res) => {
  const { email } = req.body;

  const uniqueEmail = await models.User.findOne({ where: { email } });

  if (uniqueEmail) {
    return res.status(CONFLICT).json({ message: 'Usuário já existe' });
  }
  const user = await models.User.create(req.body);
  const tokenResponse = auth.createToken(user);

  return res.status(CREATED).json({ token: tokenResponse });
});

UserRouter.get('/', auth.validateToken, async (req, res) => {
  const allUsers = await models.User.findAll({});
  return res.status(200).json(allUsers);
});

UserRouter.get('/:id', auth.validateToken, async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findOne({ where: { id } });
  if (!user) return res.status(NOT_FOUND).json({ message: 'Usuário não existe' });
  return res.status(SUCCESS).json(user);
});

UserRouter.delete('/me', auth.validateToken, async (req, res) => {
  const { email } = req.payload;
  const userDelete = await models.User.destroy({ where: { email } });
  return res.status(NO_CONTENT).json(userDelete);
});

module.exports = UserRouter;
