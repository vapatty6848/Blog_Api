const { Router } = require('express');

const postsController = Router();

const validateCreatePostMiddleware = require('../middlewares/validateCreatePostMiddleware');

const decodeToken = require('../utils/decodeToken');

const { User, BlogPost } = require('../models');

postsController.post('/post', validateCreatePostMiddleware, async (req, res) => {
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

module.exports = postsController;
