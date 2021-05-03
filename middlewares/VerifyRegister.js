const { User } = require('../models');

const badRequest = 400;
const intServerError = 500;

const verifyRegister = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      if (user !== null) return next();
      const message = 'Campos inválidos';

      return res.status(badRequest).json({ message });
    })
    .catch((error) => {
      const message = 'Unexpected Error!';

      console.log(error);
      return res.status(intServerError).json({ message });
    });
};

module.exports = {
  verifyRegister,
};
