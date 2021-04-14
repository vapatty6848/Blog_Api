const registerUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  if (displayName.length < 8) {
    return res.status(401).json({ message: '"displayName" length must be at leat 8 characters long' });
  }
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: '"email" must be avalid email' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(401).json({ message: '"password" length must be at leat 6 characters long' });
  }
  next();
};

module.exports = {
  registerUser,
};
