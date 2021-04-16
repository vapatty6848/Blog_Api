const express = require('express');
const { BlogPost, User } = require('../models');
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

PostRouter.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [{ model: User, as: 'user' }],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

PostRouter.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findOne({
      where: { id },
      include: [{ model: User, as: 'user' }],
    });
    if (post) return res.status(200).json(post);
    return res.status(404).json({ message: 'Post não existe' });
  } catch (error) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});
module.exports = PostRouter;
