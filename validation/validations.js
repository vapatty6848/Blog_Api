const {
  DISPLAY_NAME_TOO_SHORT,
  EMAIL_IS_INVALID,
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

const validateEmailForm = async (request, response, next) => {
    const { email } = request.body;
    const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailFormatIsIncorrect = !emailValidator.test(String(email).toLowerCase());
  
    if (emailFormatIsIncorrect) {
      return response
        .status(BAD_REQUEST)
        .send({ message: EMAIL_IS_INVALID });
    }
  
    next();
};

module.exports = {
    validateEmailForm,
    validateNameLength,
};
