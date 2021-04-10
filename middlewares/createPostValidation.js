const validations = require('../helpers/validations');

const createPostValidation = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title) {
    const err = validations.requiredPostTitleError();
    return res.status(err.status).json(err);
  }
  if (!content) {
    const err = validations.requiredPostContentError();
    return res.status(err.status).json(err);
  }
  return next();
};

module.exports = createPostValidation;
