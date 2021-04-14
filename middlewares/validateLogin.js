const { BAD_REQUEST } = require('../helper/statusCodes');

const validateEmail = (email) => {
  //   // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(BAD_REQUEST).send({ message: '"email" is required' });
  }
  if (password === undefined) {
    return res.status(BAD_REQUEST).send({ message: '"password" is required' });
  }
  if (email === '') {
    return res.status(BAD_REQUEST).send({ message: '"email" is not allowed to be empty' });
  }
  if (password === '') {
    return res.status(BAD_REQUEST).send({ message: '"password" is not allowed to be empty' });
  }
  if (!validateEmail(email)) {
    return res.status(BAD_REQUEST).send({ message: '"email" must be a valid email' });
  }
  next();
};

module.exports = { validateLogin };
