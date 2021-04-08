const { TITLE_REQUIRED, CONTENT_REQUIRED } = require('../dictionary/errorMessage');
const { BAD_REQUEST } = require('../dictionary/statusCode');

const requiredInfo = (req, res, next) => {
  const titleIsUndefined = req.body.title === undefined;
  const contentIsUndefined = req.body.content === undefined;

  if (titleIsUndefined) return res.status(BAD_REQUEST).json(TITLE_REQUIRED);
  if (contentIsUndefined) return res.status(BAD_REQUEST).json(CONTENT_REQUIRED);

  next();
};

module.exports = {
  requiredInfo,
};
