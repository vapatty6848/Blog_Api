const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('../document/HTTPStatus');

const obj = {
  notMail: '"email" is required',
  emptyMail: '"email" is not allowed to be empty',
  notPass: '"password" is required',
  emptyPass: '"password" is not allowed to be empty',
};

const loginValidate = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(BAD_REQUEST).json({ message: obj.notMail });
    }
    if (!email.length) {
      return res.status(BAD_REQUEST).json({ message: obj.emptyMail });
    }
    if (!password) {
      return res.status(BAD_REQUEST).json({ message: obj.notPass });
    }
    if (!password.length) {
      return res.status(BAD_REQUEST).json({ message: obj.emptyPass });
    }
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
  next();
};

module.exports = {
  loginValidate,
};
