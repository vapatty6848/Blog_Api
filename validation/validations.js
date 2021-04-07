const {
  DISPLAY_NAME_TOO_SHORT,
} = require('../dictionary/errorMessages');
const { BAD_REQUEST } = require('../dictionary/statusCodes');

const validateNameLength = async (request, response, next) => {
  const { displayName } = request.body;
  const isDisplayNameOfIncorrectLength = displayName.length < 8;

  if (isDisplayNameOfIncorrectLength) {
    return response
      .status(BAD_REQUEST)
      .send({ message: DISPLAY_NAME_TOO_SHORT });
  }

  next();
};

module.exports = {
  validateNameLength,
};
