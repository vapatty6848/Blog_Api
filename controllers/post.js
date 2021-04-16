const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const postRouter = Router();
const secret = 'secret';

const {
  titleExists,
  contentExists,
} = require('../services/midllewaresPost');

const {
  tokenValid,
} = require('../services/authToken');

postRouter.post('/', titleExists, contentExists, tokenValid,
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const { authorization } = req.headers;
      const verifyToken = jwt.verify(authorization, secret);
      const { email } = verifyToken;
      const user = await Users.findOne({ where: { email } });
      const userId = user.id;
      const post = { title, content, userId };
      return res.status(201).json(post);
    } catch (err) {
      console.log(err);
      return res.status(409).json({ message: 'Campos inválidos' });
    }
  });

module.exports = postRouter;
