const { BAD_REQUEST } = require('../helper/statusCodes');

const validateName = (name) => name.length < 8;

const validateEmail = (email) => {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validateUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (validateName(displayName)) {
    return res.status(BAD_REQUEST).send({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!email) {
    return res.status(BAD_REQUEST).send({ message: '"email" is required' });
  }
  if (!validateEmail(email)) {
    return res.status(BAD_REQUEST).send({ message: '"email" must be a valid email' });
  }
  if (!password) {
    return res.status(BAD_REQUEST).send({ message: '"password" is required' });
  }
  if (String(password).length < 6) {
    return res.status(BAD_REQUEST).send({ message: '"password" length must be 6 characters long' });
  }
  return next();
};

module.exports = { validateUser };
