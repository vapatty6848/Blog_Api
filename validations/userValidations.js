const validateName = async (req, res, next) => {
  console.log('VALIDATE USER');
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }

  next();
};

const validateEmail = async (req, res, next) => {
  console.log('VALIDATE USER');
  const { email } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }

  const regexEmail = /\S+@\S+\.\S+/;
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

const validatePassword = async (req, res, next) => {
  console.log('VALIDATE USER');
  const { password } = req.body;

  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (password.length < 6) {
    return res.status(400).json(
      { message: '"password" length must be 6 characters long' },
    );
  }

  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
