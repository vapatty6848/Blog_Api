const express = require('express');
const { Op } = require('sequelize');

const { StatusCodes } = require('http-status-codes');

const { BlogPost, User } = require('../models');
const { verifyToken } = require('../middlewares/tokenJWT');
const { validatePost, confirmUser } = require('../middlewares/validations');

const router = express.Router();

router.post('/', verifyToken, validatePost, async (req, res) => {
  const { body, payload } = req;
  const postWithUserId = { ...body, userId: payload.id };
  await BlogPost
    .create(postWithUserId).then(() => res.status(StatusCodes.CREATED).json(postWithUserId));
});

router.get('/', verifyToken, async (_req, res) => {
  await BlogPost.findAll({ include: { model: User, as: 'user', attributes: { exclude: 'password' } } })
    .then((post) => res.status(200).json(post));
});

router.get('/search?q=:searchTerm', verifyToken, async (req, res) => {
  const { searchTerm: query } = req.params;

  console.log(`
  entrou aqui???????
  ${query}
  
  `);
  await BlogPost.findAll({ where: { [Op.like]: `%${query}` } }).then((posts) => {
    res.status(StatusCodes.OK).json(posts);
  });
});

router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  await BlogPost.findByPk(id, { include: { model: User, as: 'user', attributes: { exclude: 'password' } } })
    .then((post) => {
      if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post não existe' });
      }
      return res.status(StatusCodes.OK).json(post);
    });
});

router.put('/:id', verifyToken, confirmUser, validatePost, async (req, res) => {
  const {
    body: { title, content },
    params: { id },
    payload: { id: userId },
  } = req;
  await BlogPost.update({ title, content }, { where: { id } })
    .then(() => {
      res.status(StatusCodes.OK).json({ title, content, userId });
    });
});

router.delete('/:id', verifyToken, confirmUser, async (req, res) => {
  const { id } = req.params;
  await BlogPost.destroy({ where: { id } })
    .then((post) => {
      if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post não existe' });
      }
      res.status(StatusCodes.NO_CONTENT).json();
    });
});

module.exports = router;
