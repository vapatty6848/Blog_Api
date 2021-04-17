const { Router } = require('express');

const postsController = Router();

const validateCreatePost = require('../middlewares/validateCreatePostMiddleware');
const validateGetPosts = require('../middlewares/validateGetPostsMiddleware');
const validateGetPostById = require('../middlewares/validateGetPostByIdMiddleware');
const validateUpdatedPost = require('../middlewares/validateUpdatedPostMiddleware.js');
const validateDeletePost = require('../middlewares/validateDeletePostMiddleware');

const decodeToken = require('../utils/decodeToken');

const { User, BlogPost } = require('../models');

postsController.get('/post', validateGetPosts, async (_req, _res) => {});

postsController.get('/post/:id', validateGetPostById, async (_req, _res) => {});

postsController.post('/post', validateCreatePost, async (req, res) => {
  try {
    const decodedToken = await decodeToken(req.headers.authorization);
    const foundUser = await User.findOne({ raw: true }, {
      where: {
        email: decodedToken.email,
        password: decodedToken.password,
      },
    });
    const { id } = foundUser;
    const postCreated = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      userId: id,
    });

    res.status(201).json({
      title: postCreated.dataValues.title,
      content: postCreated.dataValues.content,
      userId: postCreated.dataValues.userId,
    });
  } catch (error) {
    console.log(error);
  }
});

postsController.put('/post/:id', validateUpdatedPost, async (_req, _res) => {});

postsController.delete('/post/:id', validateDeletePost, async (_req, _res) => {});

module.exports = postsController;
