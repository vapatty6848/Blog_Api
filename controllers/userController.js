const { Router } = require('express');

const models = require('../models');
const { registerValidation } = require('../middlewares/registerValidation');
const { createToken, tokenValidation } = require('../middlewares/auth');

const CREATED = 201;
const SUCCESS = 200;
const NOT_FOUND = 404;
const CONFLICT = 409;
const NO_CONTENT_FOUNDED = 204;

const user = new Router();

user.post('/', registerValidation, async (req, res) => {
  const { email } = req.body;

  const uniqueEmail = await models.User.findOne({ where: { email } });

  if (uniqueEmail) {
    return res.status(CONFLICT).json(
      {
        message: 'Usuário já existe',
      });
  }
  const newUser = await models.User.create(req.body);
  const tokenResponse = createToken(newUser);

  return res.status(CREATED).json({ token: tokenResponse });
});

user.get('/', tokenValidation, async (req, res) => {
  const getAllUsers = await models.User.findAll({});
  return res.status(200).json(getAllUsers);

});

user.get('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const getOneUser = await models.User.findOne({ where: { id } });

  if (!getOneUser) {
    return res.status(NOT_FOUND).json(
      {
        message: 'Usuário não existe',
      },
    );
  }
  return res.status(SUCCESS).json(getOneUser);
}
);

user.delete('/me', tokenValidation, async (req, res) => {
  const { email } = req.payload;
  const destroyedUser = await models.User.destroy({ where: { email } });

  return res.status(NO_CONTENT_FOUNDED).json(destroyedUser);
}
);

module.exports = user;
