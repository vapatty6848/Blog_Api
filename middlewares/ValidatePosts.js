const { BlogPosts } = require('../models');
const { TITLE_REQUIRED, CONTENT_REQUIRED, POST_NOT_FOUND } = require('../dictionary/errorDictionary');

const InputsExists = async (req, _res, next) => {
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

module.exports = { InputsExists, IfPostExist };
