const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().min(6).required().messages({
    'string.base': '"password" should be a type of \'text\'',
    'string.empty': '"password" cannot be an empty field',
    'string.min': '"password" length must be {#limit} characters long',
    'any.required': '"password" is required',
  }),
});

const sessionSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  userSchema,
  sessionSchema,
};
