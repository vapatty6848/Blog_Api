const comebackResponse = require('../util/comebackResponse');
const messages = require('../util/returnedMessages');

const validateTitleAndContent = (req, res, next) => {
  const { title, content} = req.body;

  if (!title) return comebackResponse(res, 400, messages.requiredTitle);
  if (!content) return comebackResponse(res, 400, messages.requiredContent);
  return next();
};

module.exports = {
  validateTitleAndContent,
};
