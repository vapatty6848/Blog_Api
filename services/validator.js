const validatorLength = (body, fields) => {
  const validation = fields.map((field) => {
    if (field.requiredLength <= body[field.name].length) {
      return true;
    }
    return false;
  });
  return !validation.some((item) => item === false);
};

const emailValidator = (email) => {
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return emailRegex.test(email);
};

module.exports = {
  validatorLength,
  emailValidator,
};
