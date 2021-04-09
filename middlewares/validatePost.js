const { body, validationResult } = require('express-validator');

// Componente de repostas https
const { status, messages } = require('../utils');

const postValidationRules = () => [
  body('title')
    .exists()
    .withMessage({ message: messages.REQUIRED_TITLE }),
  body('content')
    .exists()
    .withMessage({ message: messages.REQUIRED_CONTENT }),
];

const validatePost = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const errMsg = errors.errors[0].msg;

  return res.status(status.BAD_REQUEST).json(errMsg);
};

module.exports = { postValidationRules, validatePost };
