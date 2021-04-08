const { User } = require('../models');

const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

const verifyRegisteredEmail = (req, res, next) => {
  const { email } = req.body;
  const { method } = req;

  if (method === 'GET') return next();

  User.findOne({ where: { email } })
    .then((user) => {
      if (user !== null) return next();
      const message = 'Campos inválidos';
      return res.status(BAD_REQUEST).json({ message });
    })
    .catch((error) => {
      const message = 'Unexpected Error!';

      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({ message });
    });
};

module.exports = {
  verifyRegisteredEmail,
};
