const BAD_REQUEST = 400;

const validateDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  const MINIMUM_DISPLAY_NAME_LENGTH = 8;

  if (displayName) {
    const valid = (displayName.length >= MINIMUM_DISPLAY_NAME_LENGTH
      && typeof displayName === 'string');

    if (!valid) {
      const message = '"displayName" length must be at least 8 characters long';

      return res.status(BAD_REQUEST).json({ message });
    }
    next();
  } else {
    const message = '"displayName" is required';

    return res.status(BAD_REQUEST).json({ message });
  }
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const MINIMUM_PASSWORD_LENGTH = 6;

  if (password) {
    let valid = password.length >= MINIMUM_PASSWORD_LENGTH;
    if (typeof password !== 'string') valid = JSON.stringify(password).length >= MINIMUM_PASSWORD_LENGTH;

    if (!valid) {
      const message = '"password" length must be 6 characters long';

      return res.status(BAD_REQUEST).json({ message });
    }
    next();
  } else {
    const message = '"password" is required';

    return res.status(BAD_REQUEST).json({ message });
  }
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (email) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const valid = emailRegex.test(email);

    if (!valid) {
      const message = '"email" must be a valid email';

      return res.status(BAD_REQUEST).json({ message });
    }
    next();
  } else {
    const message = '"email" is required';

    return res.status(BAD_REQUEST).json({ message });
  }
};

const validateImage = (req, res, next) => {
  const { image } = req.body;

  if (image) {
    const valid = (typeof image === 'string');

    if (!valid) {
      const message = '"image" length must be a string';

      return res.status(BAD_REQUEST).json({ message });
    }
    next();
  } else {
    const message = '"image" is required';

    return res.status(BAD_REQUEST).json({ message });
  }
};

module.exports = {
  validateDisplayName,
  validatePassword,
  validateEmail,
  validateImage,
};
