const { validatePost } = require('../schema/ValidateSchema');

const validateFieldsPost = async (req, res, next) => {
  const { title, content } = req.body;

  const validations = await validatePost(title, content);

  if (validations.message) {
    return res.status(validations.status).json({ message: validations.message });
  }

  next();
};

module.exports = {
  validateFieldsPost,
};
