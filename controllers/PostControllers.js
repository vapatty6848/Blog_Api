const { Router } = require('express');
const { Users } = require('../models');
const verifyAuthorization = require('../middlewares/verifyAuthorization');
const validateToken = require('../auth/validateToken');

const routes = Router();

routes.post('/', verifyAuthorization, async (req, res) => {
  const { title, content } = req.body;
  const { authorization: token } = req.headers;

  if (!title) return res.status(400).json({ message: '"title" is required' });

  if (!content) return res.status(400).json({ message: '"content" is required' });

  const payload = validateToken(token);
  const user = await Users.findOne({ where: { email: payload.email } });
  const userId = user.dataValues.id;

  return res.status(201).json({ title, content, userId });
});

module.exports = { routes };
