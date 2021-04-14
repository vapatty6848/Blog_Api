const { statusCode, statusMsg } = require('../utils/dictionary');

const isContent = (req, res, next) => {
  const { content } = req.body;

  if (!content || content === ' ') {
    return res.status(statusCode.BAD_REQUEST).send({ message: statusMsg.CONTENT_REQUIRED });
  }
  next();
};

const isTitle = (req, res, next) => {
  const { title } = req.body;

  if (!title || title === ' ') {
    return res.status(statusCode.BAD_REQUEST).send({ message: statusMsg.TITLE_REQUIRED });
  }
  next();
};

module.exports = { isContent, isTitle };
