const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { Users, blogPosts } = require('../models');

const postRouter = Router();
const secret = 'secret';

const {
  titleExists,
  contentExists,
  blogpostExists,
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
      return res.status(500).json({ message: 'Erro muito estranho (o.o)' });
    }
  });

postRouter.get('/', tokenValid,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      const verifyToken = jwt.verify(authorization, secret);
      const { email } = verifyToken;
      const user = await Users.findOne({ where: { email } });
      const allposts = await blogPosts.findAll({
        where: { email },
        include: [{ model: Users, as: 'user' }],
      });
      return res.status(200).json({ allposts, user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro muito estranho (o.o)' });
    }
  });

postRouter.get('/:id', tokenValid, blogpostExists,
  async (req, res) => {
    try {
      const { id } = req.params;
      const dbId = await blogPosts.findOne({ where: { id } });
      const { authorization } = req.headers;
      const verifyToken = jwt.verify(authorization, secret);
      const { email } = verifyToken;
      const user = await Users.findOne({ where: { email } });
      return res.status(200).json({ dbId, user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro muito estranho (o.o)' });
    }
  });

module.exports = postRouter;
