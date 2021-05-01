const badRequest = 400;

const displayNameValidation = (req, res, next) => {
  const { method } = req;

  if (method === 'GET') return next();

  const { displayName } = req.body;

  if (displayName) {
    const valid = (displayName.length >= 8
      && typeof displayName === 'string');

    if (!valid) {
      const message = '"displayName" length must be at least 8 characters long';

      return res.status(badRequest).json({ message });
    }
    next();
  } else {
    const message = '"displayName" is required';

    return res.status(badRequest).json({ message });
  }
};

const passwordValidation = (req, res, next) => {
  const { method } = req;

  if (method === 'GET') return next();

  const { password } = req.body;
  const MINIMUM_PASSWORD_LENGTH = 6;

  if (password) {
    let valid = password.length >= MINIMUM_PASSWORD_LENGTH;
    if (typeof password !== 'string') valid = JSON.stringify(password).length >= MINIMUM_PASSWORD_LENGTH;

    if (!valid) {
      const message = '"password" length must be 6 characters long';

      return res.status(badRequest).json({ message });
    }
    next();
  } else {
    const message = '"password" is required';

    return res.status(badRequest).json({ message });
  }
};

const emailValidation = (req, res, next) => {
  const { method } = req;

  if (method === 'GET') return next();

  const { email } = req.body;

  if (email) {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const valid = regexEmail.test(email);

    if (!valid) {
      const message = '"email" must be a valid email';

      return res.status(badRequest).json({ message });
    }
    next();
  } else {
    const message = '"email" is required';

    return res.status(badRequest).json({ message });
  }
};

const imageValidation = (req, res, next) => {
  const { method } = req;

  if (method === 'GET') return next();

  const { image } = req.body;

  if (image) {
    const valid = (typeof image === 'string');

    if (!valid) {
      const message = '"image" length must be a string';

      return res.status(badRequest).json({ message });
    }
    next();
  } else {
    const message = '"image" is required';

    return res.status(badRequest).json({ message });
  }
};

module.exports = {
  displayNameValidation,
  passwordValidation,
  emailValidation,
  imageValidation,
};
