const validateName = (name) => name.length < 8;
const validateEmail = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

const validateUser = (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (validateName(displayName)) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!password) {
    return res.status(400)
      .json({ message: '"password" is required' });
  }
  if (!email) {
    return res.status(400)
      .json({ message: '"email" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email !== '') {
    return res.status(400)
      .json({ message: '"email" is required' });
  }
  if (email.length < 1) {
    return res.status(400)
      .json({ message: '"email" is not allowed to be empty' });
  }
  if (!password && password !== '') {
    return res.status(400)
      .json({ message: '"password" is required' });
  }
  if (password.length < 1) {
    return res.status(400)
      .json({ message: '"password" is not allowed to be empty' });
  }

  next();
};

module.exports = {
  validateUser,
  validateLogin,
};
