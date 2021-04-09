const { TITLE_REQUIRED, CONTENT_REQUIRED, USER_NOT_AUTHORIZED } = require('../dictionary/errorMessage');
const { BAD_REQUEST, UNAUTHORIZED } = require('../dictionary/statusCode');

const requiredInfo = (req, res, next) => {
  const titleIsUndefined = req.body.title === undefined;
  const contentIsUndefined = req.body.content === undefined;

  if (titleIsUndefined) return res.status(BAD_REQUEST).json(TITLE_REQUIRED);
  if (contentIsUndefined) return res.status(BAD_REQUEST).json(CONTENT_REQUIRED);

  next();
};

const blogPostAuthor = (req, res, next) => {
  const notAuthorized = Number(req.params.id) !== Number(req.user.id);

  if (notAuthorized) return res.status(UNAUTHORIZED).json(USER_NOT_AUTHORIZED);

  next();
};

module.exports = {
  requiredInfo,
  blogPostAuthor,
};
