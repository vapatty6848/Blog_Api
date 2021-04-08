const validateEmail = async (req, res, next) => {
  console.log('VALIDATE EMAIL LOGIN');
  const { email } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }

  if (email.length < 1) {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }

  next();
};

const validatePassword = async (req, res, next) => {
  console.log('VALIDATE EMAIL LOGIN');
  const { password } = req.body;

  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (password.length < 1) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
};
