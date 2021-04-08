const { User } = require('../models');

const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

const duplicatedEmail = (req, res, next) => {
  const { method } = req;

  if (method === 'GET') return next();

  const { email } = req.body;

  User.findOne({ where: { email } }).then((foundUser) => {
    const message = 'Usuário já existe';

    if (foundUser === null) return next();
    return res.status(CONFLICT).json({ message });
  }).catch((error) => {
    const message = 'Unexpected Error!';

    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json({ message });
  });
};

module.exports = {
  duplicatedEmail,
};
