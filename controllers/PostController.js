const { Router } = require('express');
const { Op } = require('sequelize');
const { User } = require('../models');
const { BlogPost } = require('../models');
const { validateToken } = require('../middlewares/ValidateToken');
const { validatePost } = require('../middlewares/ValidatePost');
const { decodeToken } = require('../services/DecodeToken');

const PostController = new Router();
const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const unexpectedError = (error, res) => {
  const message = 'Unexpected Error!';

  console.log(error);
  return res.status(INTERNAL_SERVER_ERROR).json({ message });
};

PostController.get('/search', validateToken, (req, res) => {
  const query = req.query.q;
  console.log(query);
  BlogPost.findAll({ where: { [Op.or]: [
    { title: { [Op.like]: `%${query}%` } },
    { content: { [Op.like]: `%${query}%` } },
  ] },
  include: [{ model: User, as: 'user' }],
  }).then((posts) => res.status(SUCCESS).json(posts))
    .catch((error) => unexpectedError(error, res));
});

PostController.get('/:id', validateToken, (req, res) => {
  const { id } = req.params;

  BlogPost.findAll({ where: { id }, include: [{ model: User, as: 'user' }] })
    .then((posts) => {
      const message = 'Post não existe';

      if (!posts.length) return res.status(NOT_FOUND).json({ message });
      return res.status(SUCCESS).json(posts[0]);
    })
    .catch((error) => unexpectedError(error, res));
});

PostController.get('/', validateToken, (_req, res) => {
  BlogPost.findAll({ include: [{ model: User, as: 'user' }] })
    .then((posts) => res.status(SUCCESS).json(posts))
    .catch((error) => unexpectedError(error, res));
});

PostController.put('/:id', validateToken, validatePost, async (req, res) => {
  const {
    params: { id },
    body: { title, content },
    headers: { authorization },
  } = req;
  const [email] = decodeToken(authorization);
  const validatedUserId = await User.findOne({ where: { email } })
    .then(({ id: foundId }) => foundId).catch((error) => unexpectedError(error, res));
  const postToUpdate = await BlogPost.findOne({ where: { id } }).then((post) => post)
    .catch((error) => unexpectedError(error, res));

  if (postToUpdate.userId !== validatedUserId) {
    const message = 'Usuário não autorizado';

    return res.status(UNAUTHORIZED).json({ message });
  }
  BlogPost.update({ title, content }, { where: { id } })
    .then((_updatedPost) => res.status(SUCCESS).json({ title, content, userId: validatedUserId }))
    .catch((error) => unexpectedError(error, res));
});

PostController.post('/', validateToken, validatePost, async (req, res) => {
  const { headers: { authorization }, body: { title, content } } = req;
  const [email] = decodeToken(authorization);
  const validatedUserId = await User.findOne({ where: { email } }).then((user) => user)
    .catch((error) => unexpectedError(error, res));

  if (validatedUserId !== null) {
    const { id: userId } = validatedUserId;

    BlogPost.create({ title, content, userId })
      .then((_createdPost) => res.status(CREATED).json({ title, content, userId }))
      .catch((error) => unexpectedError(error, res));
  }
});

PostController.delete('/:id', validateToken, async (req, res) => {
  const { params: { id }, headers: { authorization } } = req;
  const [email] = decodeToken(authorization);
  const validatedUserId = await User.findOne({ where: { email } })
    .then(({ id: foundId }) => foundId).catch((error) => unexpectedError(error, res));
  const postToDelete = await BlogPost.findOne({ where: { id } }).then((post) => post)
    .catch((error) => unexpectedError(error, res));

  if (postToDelete === null) {
    const message = 'Post não existe';

    return res.status(NOT_FOUND).json({ message });
  }
  if (postToDelete.userId !== validatedUserId) {
    const message = 'Usuário não autorizado';

    return res.status(UNAUTHORIZED).json({ message });
  }
  BlogPost.destroy({ where: { id } }).then((_deletedPost) => res.status(NO_CONTENT).send())
    .catch((error) => unexpectedError(error, res));
});

module.exports = PostController;
