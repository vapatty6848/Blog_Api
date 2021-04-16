const express = require('express');
const { BlogPost } = require('../models');
const { registerPost } = require('../middlewares/PostMid');
const { verifyToken } = require('../middlewares/TokenMid');

const PostRouter = express.Router();
PostRouter.post('/', registerPost, verifyToken, async (req, res) => {
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
module.exports = PostRouter;
