const jwt = require('jsonwebtoken');
const express = require('express');
const { BlogPost } = require('../models');
const { secret } = require('../auth/ValidateToken');
const { verifyToken } = require('../middlewares/TokenMid');
const { registerPost } = require('../middlewares/PostMid');

const PostRouter = express.Router();

PostRouter.post('/', registerPost, verifyToken, async (req, res) => {
  const token = req.headers.authorization;
  const { userData } = jwt.verify(token, secret);
  const userId = userData.id;
  const { title, content } = req.body;
  BlogPost.create({ title, content, userId })
    .then((result) => res.status(201).json(result))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = PostRouter;
