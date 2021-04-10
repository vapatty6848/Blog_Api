const { validatePostFields } = require('../Schema/postSchema');

module.exports = (req, res, next) => {
  const { title, content } = req.body;

  const validation = validatePostFields(title, content);

  if (validation.message) {
    switch (validation.message) {
      case ('title'): return res.status(validation.errorCode)
        .send({ message: '"title" is required' });
      case ('content'): return res.status(validation.errorCode)
        .send({ message: '"content" is required' });
      default: return {};
    }
  }

  next();
};
