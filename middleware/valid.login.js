const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const validLogin = (req, res, next) => {
  const { email, password } = req.body;
  let message;
  if (email === '') {
    message = '"email" is not allowed to be empty';
    return res.status(400).json({ message });
  }
  if (email === undefined) {
    message = '"email" is required';
    return res.status(400).json({ message });
  }
  if (!validateEmail(email)) {
    message = '"email" must be a valid email';
    return res.status(400).json({ message });
  }
  if (password === '') {
    message = '"password" is not allowed to be empty';
    return res.status(400).json({ message });
  }
  if (password === undefined) {
    message = '"password" is required';
    return res.status(400).json({ message });
  }
  return next();
};

module.exports = { validLogin };
