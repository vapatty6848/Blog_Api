const Joi = require('joi');
const { BAD_REQUEST, INTERNAL_ERROR } = require('../utils/allStatusCode');

const userSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().length(6).required(),
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

module.exports = UserValidation;
