const { Router } = require('express');
const { User } = require('../models');
const { BlogPost } = require('../models');
const { validateToken } = require('../middlewares/ValidateToken');
const { validatePost } = require('../middlewares/ValidatePost');
const { decodeToken } = require('../services/DecodeToken');

const PostController = new Router();
const SUCCESS = 200;
const CREATED = 201;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const unexpectedError = (error, res) => {
  const message = 'Unexpected Error!';

  console.log(error);
  return res.status(INTERNAL_SERVER_ERROR).json({ message });
};

PostController.get('/', validateToken, (_req, res) => {
  BlogPost.findAll({ include: [{ model: User, as: 'user' }] })
    .then((posts) => res.status(SUCCESS).json(posts))
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

PostController.put('/:id', validateToken, validatePost, async (req, res) => {
  const {
    params: { id },
    body: { title, content },
    headers: { authorization },
  } = req;
  const [email] = decodeToken(authorization);
  const validatedUserId = await User.findOne({ where: { email } })
    .then(({ id: foundId }) => foundId).catch((error) => unexpectedError(error, res));

  BlogPost.findOne({ where: { id } }).then((post) => {
    if (post.userId !== validatedUserId) {
      const message = 'Usuário não autorizado';
      return res.status(UNAUTHORIZED).json({ message });
    }
    return BlogPost.update({ title, content }, { where: { id } });
  })
    .then(() => res
      .status(SUCCESS).json({ title, content, userId: validatedUserId }));
});

PostController.post('/', validateToken, validatePost, (req, res) => {
  const { headers: { authorization }, body: { title, content } } = req;
  const [email] = decodeToken(authorization);

  User.findOne({ where: { email } }).then((user) => {
    if (user !== null) {
      const { id: userId } = user;

      return BlogPost.create({ title, content, userId });
    }
  }).then(({
    title: newTitle,
    content: newContent,
    userId,
  }) => res.status(CREATED).json({ title: newTitle, content: newContent, userId }))
    .catch((error) => unexpectedError(error, res));
});

module.exports = PostController;
