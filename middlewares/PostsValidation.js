const Joi = require('joi');

const BAD_REQUEST = 400;
const INTERNAL_ERROR = 500;

const schema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
});

const PostsValidation = (req, res, next) => {
  const { title, content } = req.body;
  const { error } = schema.validate({ title, content });
  try {
    if (error) {
      return res.status(BAD_REQUEST).json({ message: error.details[0].message });
    }
  } catch (err) {
    res.status(INTERNAL_ERROR).json({ message: err.message });
  }
  next();
};

module.exports = PostsValidation;
