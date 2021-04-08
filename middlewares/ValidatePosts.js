const jwt = require('jsonwebtoken');
const { BlogPosts, Users } = require('../models');
const { TITLE_REQUIRED, CONTENT_REQUIRED, POST_NOT_FOUND,
  USER_NOT_AUTHORIZED } = require('../dictionary/errorDictionary');

const IfInputsExists = async (req, _res, next) => {
  const { title, content } = req.body;
  if (!title) return next(TITLE_REQUIRED);
  if (!content) return next(CONTENT_REQUIRED);
  next();
};

const IfPostExist = async (req, _res, next) => {
  const { id } = req.params;
  const post = await BlogPosts.findOne({ where: { id } });
  if (!post) return next(POST_NOT_FOUND);
  next();
};

const IfUserHasAuthorization = async (req, _res, next) => {
  const { id } = req.params;
  const userId = jwt.decode(req.headers.authorization);

  const post = await BlogPosts.findOne({ where: { id },
    include: { model: Users, as: 'user', attributes: { exclude: 'password' } } });
  const { user } = post;

  if (user.dataValues.id !== userId.id) return next(USER_NOT_AUTHORIZED);
  req.userIdFromMiddleware = userId;
  next();
};

module.exports = { IfInputsExists, IfPostExist, IfUserHasAuthorization };
