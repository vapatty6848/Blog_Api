const { validateLoginFields } = require('../Schema/loginSchema');

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  const validation = validateLoginFields(email, password);

  if (validation.message) {
    switch (validation.message) {
      case ('email'): return res.status(validation.errorCode)
        .send({ message: '"email" is required' });
      case ('password'): return res.status(validation.errorCode)
        .send({ message: '"password" is required' });
      case ('emailEmpty'): return res.status(validation.errorCode)
        .send({ message: '"email" is not allowed to be empty' });
      case ('passwordEmpty'): return res.status(validation.errorCode)
        .send({ message: '"password" is not allowed to be empty' });
      case ('invalidMail'): return res.status(validation.errorCode)
        .send({ message: '"email" must be a valid email' });
      default: return {};
    }
  }

  next();
};
