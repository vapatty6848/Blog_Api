const badRequest = 400;

const passwordLoginValidation = (req, res, next) => {
  const { password } = req.body;

  if (password) {
    next();
  } else {
    if (password === undefined) {
      const message = '"password" is required';

      return res.status(badRequest).json({ message });
    }
    let empty = password.length === 0;
    if (typeof password !== 'string') empty = !JSON.stringify(password).length === 0;

    if (empty) {
      const message = '"password" is not allowed to be empty';

      return res.status(badRequest).json({ message });
    }
  }
};

const emailLoginValidation = (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    const message = '"email" is required';

    return res.status(badRequest).json({ message });
  }
  if (!email) {
    const message = '"email" is not allowed to be empty';

    return res.status(badRequest).json({ message });
  }
  next();
};

module.exports = {
  passwordLoginValidation,
  emailLoginValidation,
};
