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
    .then((answer) => res.status(200).json(answer));
});

module.exports = router;
