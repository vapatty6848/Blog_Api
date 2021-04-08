const { Router } = require('express');
const { User } = require('../models');
const { BlogPost } = require('../models');
const { validateToken } = require('../middlewares/ValidateToken');
const { validatePost } = require('../middlewares/ValidatePost');
const { decodeToken } = require('../services/DecodeToken');

const PostController = new Router();
const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;

const unexpectedError = (error, res) => {
  const message = 'Unexpected Error!';

  console.log(error);
  return res.status(INTERNAL_SERVER_ERROR).json({ message });
};

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
