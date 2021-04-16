const express = require('express');
const { BlogPost } = require('../models');
const { registerPost, verifyToken } = require('../middlewares/PostMid');

const postRouter = express.Router();

postRouter.post('/', registerPost, verifyToken, async (req, res) => {
  const { userData } = req;
  const userId = userData.id;
  const { title, content } = req.body;

  await BlogPost.create({ title, content, userId })
    .then((result) => res.status(201).json(result))
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = postRouter;
