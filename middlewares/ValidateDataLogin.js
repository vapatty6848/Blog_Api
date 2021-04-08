const BAD_REQUEST = 400;

const validatePasswordLogin = (req, res, next) => {
  const { password } = req.body;
  const EMPTY_PASSWORD = 0;

  if (password) {
    next();
  } else {
    if (password === undefined) {
      const message = '"password" is required';

      return res.status(BAD_REQUEST).json({ message });
    }
    let empty = password.length === EMPTY_PASSWORD;
    if (typeof password !== 'string') empty = !JSON.stringify(password).length === EMPTY_PASSWORD;

    if (empty) {
      const message = '"password" is not allowed to be empty';

      return res.status(BAD_REQUEST).json({ message });
    }
  }
};

const validateEmailLogin = (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    const message = '"email" is required';

    return res.status(BAD_REQUEST).json({ message });
  }
  if (!email) {
    const message = '"email" is not allowed to be empty';

    return res.status(BAD_REQUEST).json({ message });
  }
  next();
};

module.exports = {
  validatePasswordLogin,
  validateEmailLogin,
};
