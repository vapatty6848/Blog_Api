const { validateUserFields } = require('../Schema/userSchema');

module.exports = (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const validation = validateUserFields(displayName, email, password, image);

  if (validation.message) {
    switch (validation.message) {
      case ('name'): return res.status(validation.errorCode)
        .send({ message: '"displayName" is required' });
      case ('email'): return res.status(validation.errorCode)
        .send({ message: '"email" is required' });
      case ('password'): return res.status(validation.errorCode)
        .send({ message: '"password" is required' });
      case ('nameLess8'): return res.status(validation.errorCode)
        .send({ message: '"displayName" length must be at least 8 characters long' });
      case ('invalidMail'): return res.status(validation.errorCode)
        .send({ message: '"email" must be a valid email' });
      case ('passLess6'): return res.status(validation.errorCode)
        .send({ message: '"password" length must be 6 characters long' });
      default: return {};
    }
  }

  next();
};
