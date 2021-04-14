const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { SECRET, config } = require('../middlewares/auth');
const { validateLogin } = require('../middlewares/validateLogin');
const models = require('../models');
const { OK, BAD_REQUEST } = require('../helper/statusCodes');

const router = Router();

router.post('/', validateLogin, async (req, res) => {
  const { email } = req.body;
  const user = await models.User.findOne({ where: { email } });
  if (!user) return res.status(BAD_REQUEST).send({ message: 'Campos inválidos' });
  const token = jwt.sign({ data: user }, SECRET, config);
  return res.status(OK).send({ token });
});

module.exports = router;
