const express = require('express');
const { StatusCodes } = require('http-status-codes');

const { BlogPost, User } = require('../models');
const { verifyToken } = require('../middlewares/tokenJWT');
const { validatePost } = require('../middlewares/validations');

const router = express.Router();

router.post('/', verifyToken, validatePost, async (req, res) => {
  const { body, payload } = req;
  const postWithUserId = { ...body, userId: payload.id };
  console.log(postWithUserId);
  await BlogPost
    .create(postWithUserId).then(() => res.status(StatusCodes.CREATED).json(postWithUserId));
});

router.get('/', verifyToken, async (_req, res) => {
  await BlogPost.findAll({ include: { model: User, as: 'user', attributes: { exclude: 'password' } } })
    .then((post) => res.status(200).json(post));
});

router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  await BlogPost.findByPk(id, { include: { model: User, as: 'user', attributes: { exclude: 'password' } } })
    .then((post) => {
      if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post não existe' });
      }
      return res.status(200).json(post);
    });
});

module.exports = router;
