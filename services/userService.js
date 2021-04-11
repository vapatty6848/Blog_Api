const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateDisplayName = (name) => name.length < 8;

const validateUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (validateDisplayName(displayName)) {
    res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!email) {
    res.status(400).json({ message: '"email" is required' });
  }
  if (!validateEmail(email)) {
    res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (!password) {
    res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    res.status(400).json({ message: '"password" length must be 6 characters long' });
  }

  next();
};

module.exports = {
  validateUser,
};
