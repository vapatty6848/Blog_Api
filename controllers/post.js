const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { Users, BlogPosts } = require('../models');

const postRouter = Router();
const secret = 'secret';

const {
  titleExists,
  contentExists,
  blogpostExists,
  sameUser,
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
      await BlogPosts.create({ title, content });
      return res.status(201).json({ title, content, userId });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro muito estranho (o.o)' });
    }
  });

postRouter.get('/', tokenValid,
  async (_req, res) => {
    try {
      const allposts = await BlogPosts.findAll({ include: { model: Users, as: 'user' } });
      return res.status(200).json(allposts);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro muito estranho (o.o)' });
    }
  });

postRouter.get('/:id', tokenValid, blogpostExists,
  async (req, res) => {
    try {
      const { id } = req.params;
      const post = await BlogPosts.findByPk(id);
      const { authorization } = req.headers;
      const verifyToken = jwt.verify(authorization, secret);
      const { email } = verifyToken;
      const user = await Users.findOne({ where: { email } });
      return res.status(200).json({ ...post.dataValues, user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro muito estranho (o.o)' });
    }
  });

// postRouter.put('/:id', tokenValid, blogpostExists, titleExists, contentExists,
//   async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { title, content } = req.body;
//       const { authorization } = req.headers;
//       const verifyToken = jwt.verify(authorization, secret);
//       const { email } = verifyToken;
//       const userId = await Users.findOne({ where: { email } });
//       const dbId = await BlogPosts.update({ where: { id } });

//       return res.status(200).json({ title, content, userId });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ message: 'Erro muito estranho (o.o)' });
//     }
//   });

postRouter.delete('/:id', tokenValid, blogpostExists, sameUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      await BlogPosts.destroy({ where: { id } });
      return res.status(204).end();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro muito estranho (o.o)' });
    }
  });

module.exports = postRouter;
