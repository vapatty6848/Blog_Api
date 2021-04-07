// const { BlogPosts } = require('../models');
const { TITLE_REQUIRED, CONTENT_REQUIRED } = require('../dictionary/errorDictionary');

const InputsExists = async (req, _res, next) => {
  const { title, content } = req.body;
  if (!title) return next(TITLE_REQUIRED);
  if (!content) return next(CONTENT_REQUIRED);
  next();
};

module.exports = { InputsExists };
