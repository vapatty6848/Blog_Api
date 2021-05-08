const rescue = require('express-rescue');

const { BAD_REQUEST } = require('../utils/statusCodeHandler');

const { code, message } = BAD_REQUEST;

const validateCreatePost = rescue(async (request, response, next) => {
  const { title, content } = request.body;

  if (!title) return response.status(code).json({ message: message.requiredTitle });
  if (!content) return response.status(code).json({ message: message.requiredContent });

  next();
});

module.exports = { validateCreatePost };
