const { Router } = require('express');

const models = require('../models');
const { postValidation } = require('../middlewares/postValidation');
const { tokenValidation } = require('../middlewares/auth');

const post = new Router();

const CREATED = 201;
const NO_CONTENT_FOUNDED = 204;
const NOT_AUTHORIZED = 401;
const NOT_FOUND = 404;
const SUCCESS = 200;

post.post('/', postValidation, tokenValidation, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.payload;
  console.log(req.payload);

  try {
    const newPost = await models.BlogPosts.create({ title, content, userId: id });
    return res.status(CREATED).json(newPost);
  } catch (err) {
    return res.status(NOT_FOUND).json(
      {
        message: err.message,
      },
    );
  };
});

post.get('/', tokenValidation, async (req, res) => {
  const getAllPosts = await models.BlogPosts.findAll({
    attributes: { exclude: 'userId' },
    include: { model: models.User, as: 'user', attributes: { exclude: 'password' } },
  });

  return res.status(SUCCESS).json(getAllPosts);

});

post.get('/:id', tokenValidation, async (req, res) => {
  const { id: userId } = req.payload;
  const { id } = req.params;

  const getOnePost = await models.BlogPosts.findOne({
    where: { userId, id },
    attributes: { exclude: 'userId' },
    include: { model: models.User, as: 'user', attributes: { exclude: 'password' } },
  });

  if (!getOnePost) {
    return res.status(404).json(
      {
        message: 'Post não existe',
      },
    );
  }

  return res.status(200).json(getOnePost);
}
);

post.put('/:id', tokenValidation, postValidation, async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.payload;
  const { id } = req.params;

  const updatedPost = await models.BlogPosts.findOne({ where: { id } });

  if (updatedPost.userId !== userId) {
    return res.status(NOT_AUTHORIZED).json(
      {
        message: 'Usuário não autorizado',
      },
    );
  }
  updatedPost.title = title;
  updatedPost.content = content;
  await updatedPost.save();

  return res.status(SUCCESS).json({ title, content, userId });
}
);

post.delete('/:id', tokenValidation, async (req, res) => {
  const { id: userId } = req.payload;
  const { id } = req.params;

  const destroyedPost = await models.BlogPosts.findOne({ where: { id } });
  if (!destroyedPost) {
    return res.status(NOT_FOUND).json(
      {
        message: 'Post não existe',
      },
    );
  }

  if (destroyedPost.userId !== userId) {
    return res.status(NOT_AUTHORIZED).json(
      {
        message: 'Usuário não autorizado',
      },
    );
  }
  await models.BlogPosts.destroy({ where: { id } });

  return res.status(NO_CONTENT_FOUNDED).send();
}
);

module.exports = post;
