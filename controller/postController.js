const express = require('express');
const { BlogPost } = require('../models');
const { registerPost } = require('../middlewares/PostMid');
const { verifyToken } = require('../middlewares/UserMid');

const postRouter = express.Router();

postRouter.post('/', registerPost, verifyToken, async (req, res) => {
  try {
    const { userData } = req;
    const userId = userData.id;
    const { title, content } = req.body;
    const createdPost = await BlogPost.create({ title, content, userId });
    return res.status(201).json(createdPost);
  } catch (error) {
    return res.status(500).send({ message: 'Algo deu errado' });
  }
});

module.exports = postRouter;
