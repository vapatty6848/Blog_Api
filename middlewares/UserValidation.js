const Joi = require('joi');

const BAD_REQUEST = 400;
const INTERNAL_ERROR = 500;

const schema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().min(6).required(),
});

const UserValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const { error } = schema.validate({ displayName, email, password });
  try {
    // Erro do README que obrigou criar uma mensagem incorreta personalizada.
    if (error && error.details[0].message === '"password" length must be at least 6 characters long') {
      return res.status(BAD_REQUEST).json({ message: '"password" length must be 6 characters long' });
    }
    if (error) {
      return res.status(BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
  } catch (err) {
    res.status(INTERNAL_ERROR).json({ message: err.message });
  }
};

module.exports = UserValidation;
