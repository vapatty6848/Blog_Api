const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  next();
};

module.exports = { validateLogin };
