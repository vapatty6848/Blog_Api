const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

const validateRequest = (req, next, schema) => {
  const { error, value } = schema.validate(req.body);

  if (error) error.details.map((err) => next(Boom.badRequest(err.message)));

  req.body = value;

  next();
};

module.exports = (req, _res, next) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().messages({
      'string.base': '"password" should be a type of string',
      'string.min': '"password" length must be 6 characters long',
      'any.required': '"password" is required',
    }),
    image: Joi.string(),
  });
  return validateRequest(req, next, schema);
};
