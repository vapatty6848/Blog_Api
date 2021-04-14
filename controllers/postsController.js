const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { isContent, isTitle } = require('../middlewares/postValidations');
const { emailAlreadyExists } = require('../middlewares/userValidations');
const { BlogPost, User } = require('../models');

const { statusCode, statusMsg } = require('../utils/dictionary');
const validateAuthorization = require('../middlewares/validateAuthorization');

const postRouter = Router();

postRouter.post('/', validateAuthorization, isContent, isTitle, async (req, res) => {
  const { title, content } = req.body;
  const { authorization } = req.headers;

  const { email } = jwt.decode(authorization);
  const UserDB = await emailAlreadyExists(email);
  const userId = UserDB.dataValues.id;

  const newPost = await BlogPost.create({ title, content, userId });
  return res.status(statusCode.SUCCESS_CREATED).send(newPost);
});

postRouter.get('/', validateAuthorization, async (_req, res) => {
  const allPosts = await BlogPost.findAll({
    include: { model: User, as: 'user' },
    attributes: { exclude: ['userId'] },
  });
  return res.status(statusCode.SUCCESS).send(allPosts);
});

postRouter.get('/:id', validateAuthorization, async (req, res) => {
  const { id } = req.params;
  const oneBlogPost = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user' }],
    attributes: { exclude: ['userId'] },
  });
  console.log('oneBlogPost:', oneBlogPost);
  if (!oneBlogPost || oneBlogPost === ' ') {
    return res.status(statusCode.NOT_FOUND).send({ message: statusMsg.POST_NOT_FOUND });
  }
  return res.status(statusCode.SUCCESS).send(oneBlogPost);
});

postRouter.delete('/:id', validateAuthorization, async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const { email } = jwt.decode(authorization);
  const UserDB = await emailAlreadyExists(email);
  const userId = UserDB.dataValues.id;

  const postExists = await BlogPost.findByPk(id);

  if (!postExists || postExists === ' ') {
    return res.status(statusCode.NOT_FOUND)
      .send({ message: statusMsg.POST_NOT_FOUND });
  }

  if (postExists.userId === userId) {
    await BlogPost.destroy({ where: { id } });
    return res.status(statusCode.NO_CONTENT).send();
  }
  return res.status(statusCode.UNAUTHORIZED).send({ message: statusMsg.USER_UNAUTHORIZED });
});

module.exports = postRouter;
