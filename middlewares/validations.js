const Joi = require('joi');
const { BAD_REQUEST, INTERNAL_ERROR } = require('../utils/allStatusCode');

const userSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().length(6).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().length(6).required(),
});
const blogPostsSchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
});

const UserValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const { error } = userSchema.validate({ displayName, email, password });
  try {
    if (error) {
      return res.status(BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
  } catch (err) {
    res.status(INTERNAL_ERROR).json({ message: err.message });
  }
};

const LoginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  try {
    if (error) {
      return res.status(BAD_REQUEST).json({ message: error.details[0].message });
    }
  } catch (err) {
    res.status(INTERNAL_ERROR).json({ message: err.message });
  }
  next();
};

const BlogPostValidation = (req, res, next) => {
  const { title, content } = req.body;
  const { error } = blogPostsSchema.validate({ title, content });
  try {
    if (error) {
      return res.status(BAD_REQUEST).json({ message: error.details[0].message });
    }
  } catch (err) {
    res.status(INTERNAL_ERROR).json({ message: err.message });
  }
  next();
};

module.exports = { BlogPostValidation, LoginValidation, UserValidation };
