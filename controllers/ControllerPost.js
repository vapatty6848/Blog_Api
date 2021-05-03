const { Router } = require('express');
const { Op } = require('sequelize');
const { User } = require('../models');
const { BlogPost } = require('../models');
const { tokenValidate } = require('../middlewares/TokenValidate');
const { postValidate } = require('../middlewares/PostValidate');
const { tokenDecoded } = require('../services/TokenDecoded');

const controllerPost = new Router();
const success = 200;
const created = 201;
const noContent = 204;
const unauthorized = 401;
const notFound = 404;
const intServerError = 500;

const unexpectedError = (error, res) => {
  const message = 'Unexpected Error!';

  console.log(error);
  return res.status(intServerError).json({ message });
};

controllerPost.get('/search', tokenValidate, (req, res) => {
  const query = req.query.q;
  BlogPost.findAll({ where: { [Op.or]: [
    { title: { [Op.like]: `%${query}%` } },
    { content: { [Op.like]: `%${query}%` } },
  ] },
  include: [{ model: User, as: 'user' }],
  }).then((posts) => res.status(success).json(posts))
    .catch((error) => unexpectedError(error, res));
});

controllerPost.get('/:id', tokenValidate, (req, res) => {
  const { id } = req.params;

  BlogPost.findAll({ where: { id }, include: [{ model: User, as: 'user' }] })
    .then((posts) => {
      const message = 'Post não existe';

      if (!posts.length) return res.status(notFound).json({ message });
      return res.status(success).json(posts[0]);
    })
    .catch((error) => unexpectedError(error, res));
});

controllerPost.get('/', tokenValidate, (_req, res) => {
  BlogPost.findAll({ include: [{ model: User, as: 'user' }] })
    .then((posts) => res.status(success).json(posts))
    .catch((error) => unexpectedError(error, res));
});

controllerPost.put('/:id', tokenValidate, postValidate, async (req, res) => {
  const { params: { id }, body: { title, content }, headers: { authorization } } = req;
  const [email] = tokenDecoded(authorization);
  const validatedUserId = await User.findOne({ where: { email } })
    .then(({ id: foundId }) => foundId).catch((error) => unexpectedError(error, res));
  const postToUpdate = await BlogPost.findOne({ where: { id } }).then((post) => post)
    .catch((error) => unexpectedError(error, res));

  if (postToUpdate.userId !== validatedUserId) {
    const message = 'Usuário não autorizado';

    return res.status(unauthorized).json({ message });
  }
  BlogPost.update({ title, content }, { where: { id } })
    .then((_updatedPost) => res.status(success).json({ title, content, userId: validatedUserId }))
    .catch((error) => unexpectedError(error, res));
});

controllerPost.post('/', tokenValidate, postValidate, async (req, res) => {
  const { headers: { authorization }, body: { title, content } } = req;
  const [email] = tokenDecoded(authorization);
  const validatedUserId = await User.findOne({ where: { email } }).then((user) => user)
    .catch((error) => unexpectedError(error, res));

  if (validatedUserId !== null) {
    const { id: userId } = validatedUserId;

    BlogPost.create({ title, content, userId })
      .then((_createdPost) => res.status(created).json({ title, content, userId }))
      .catch((error) => unexpectedError(error, res));
  }
});

controllerPost.delete('/:id', tokenValidate, async (req, res) => {
  const { params: { id }, headers: { authorization } } = req;
  const [email] = tokenDecoded(authorization);
  const validatedUserId = await User.findOne({ where: { email } })
    .then(({ id: foundId }) => foundId).catch((error) => unexpectedError(error, res));
  const postToDelete = await BlogPost.findOne({ where: { id } }).then((post) => post)
    .catch((error) => unexpectedError(error, res));

  if (postToDelete === null) {
    const message = 'Post não existe';

    return res.status(notFound).json({ message });
  }
  if (postToDelete.userId !== validatedUserId) {
    const message = 'Usuário não autorizado';

    return res.status(unauthorized).json({ message });
  }
  BlogPost.destroy({ where: { id } }).then((_deletedPost) => res.status(noContent).send())
    .catch((error) => unexpectedError(error, res));
});

module.exports = controllerPost;
