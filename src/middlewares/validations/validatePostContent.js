const { status, messages } = require('../../libs/dicts');
const { ThrowError } = require('../errorHandler/utils');

const validatePostContent = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    if (!title) throw new ThrowError(status.badRequest, messages.missingTitle);
    if (!content) throw new ThrowError(status.badRequest, messages.missingContent);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validatePostContent;
