const { Router } = require('express');
const { PostValidate } = require('../middlewares/PostValidate');
const { verifyToken, validateToken } = require('../auth');

const models = require('../models');

const RouterPost = Router();
const Created = 201;
const NotFound = 404;

RouterPost.post('/', validateToken, PostValidate, async (req, res) => {
  const { title, content } = req.body;
  try {
    const token = req.headers.authorization;
    const tokenVerify = verifyToken(token);
    const { id } = tokenVerify;
    const post = await models.BlogPosts.create({ title, content, userId: id });
    return res.status(Created).send(post);
  } catch (err) {
    return res.status(NotFound).json({ message: err.message });
  }
});

module.exports = RouterPost;
