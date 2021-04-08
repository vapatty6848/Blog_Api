const { body, validationResult } = require('express-validator');

// Componente de repostas https
const { status, messages } = require('../utils');

const loginValidationRules = () => [
  body('email')
    .exists()
    .withMessage({ message: messages.REQUIRED_EMAIL })
    .not().isEmpty()
    .withMessage({ message: messages.EMPTY_EMAIL })
    .isEmail()
    .withMessage({ message: messages.BAD_EMAIL }),
  body('password')
    .exists()
    .withMessage({ message: messages.REQUIRED_PASSWORD })
    .not().isEmpty()
    .withMessage({ message: messages.EMPTY_PASSWORD }),
];

const validateLogin = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const errMsg = errors.errors[0].msg;

  return res.status(status.BAD_REQUEST).json(errMsg);
};

module.exports = { loginValidationRules, validateLogin };
