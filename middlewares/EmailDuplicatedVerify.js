const { User } = require('../models');

const conflict = 409;
const intServerError = 500;

const emailDuplicatedVerify = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ where: { email } }).then((foundUser) => {
    const message = 'Usuário já existe';

    if (foundUser === null) return next();
    return res.status(conflict).json({ message });
  }).catch((error) => {
    const message = 'Unexpected Error!';

    console.log(error);
    return res.status(intServerError).json({ message });
  });
};

module.exports = {
  emailDuplicatedVerify,
};
