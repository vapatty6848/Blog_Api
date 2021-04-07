const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('../document/HTTPStatus');

const obj = {
  name: '"displayName" length must be at least 8 characters long',
  notMail: '"email" is required',
  email: '"email" must be a valid email',
  notPass: '"password" is required',
  smallPass: '"password" length must be 6 characters long',
};

const regex = /\S+@\S+\.\S+/;
const minimumPasswordLength = 6;
const minimumNameLength = 8;

const validateUser = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;

    if (!displayName || displayName.length < minimumNameLength) {
      return res.status(BAD_REQUEST).json({ message: obj.name });
    }
    if (!email || !email.length) {
      return res.status(BAD_REQUEST).json({ message: obj.notMail });
    }
    if (!regex.test(email)) {
      return res.status(BAD_REQUEST).json({ message: obj.email });
    }
    if (!password) {
      return res.status(BAD_REQUEST).json({ message: obj.notPass });
    }
    if (password.length < minimumPasswordLength) {
      return res.status(BAD_REQUEST).json({ message: obj.smallPass });
    }
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
  next();
};

module.exports = {
  validateUser,
};
