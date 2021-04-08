const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  let message;
  if (email === '') {
    message = '"email" is not allowed to be empty';
    return res.status(400).json({ message });
  }
  if (!email) {
    message = '"email" is required';
    return res.status(400).json({ message });
  }
  if (password === '') {
    message = '"password" is not allowed to be empty';
    return res.status(400).json({ message });
  }
  if (!password) {
    message = '"password" is required';
    return res.status(400).json({ message });
  }
  return next();
};

module.exports = { validateLogin };
  