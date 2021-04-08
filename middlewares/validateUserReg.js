const { body, validationResult } = require('express-validator');

// Componente de repostas https
const { status, messages } = require('../utils');

const regValidationRules = () => [
  body('email')
    .exists()
    .withMessage({ message: messages.REQUIRED_EMAIL })
    .isEmail()
    .withMessage({ message: messages.BAD_EMAIL }),
  body('password')
    .exists()
    .withMessage({ message: messages.REQUIRED_PASSWORD })
    .isLength({ min: 6 })
    .withMessage({ message: messages.BAD_PASSWORD }),
  body('displayName')
    .exists()
    .matches(/^[a-zA-Z ]{8,100}$/)
    .withMessage({ message: messages.BAD_NAME }),
];

const validateReg = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const errMsg = errors.errors[0].msg;

  return res.status(status.BAD_REQUEST).json(errMsg);
};

module.exports = { regValidationRules, validateReg };
