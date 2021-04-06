const emailValidate = (email) => {
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regex.test(email);
};

const nameValidate = (displayName) => displayName.length < 8;

const InvalidRequest = 400;
let message = '';

const UserValidate = (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (nameValidate(displayName)) {
    message = '"displayName" length must be at least 8 characters long';
    return res.status(InvalidRequest).json({ message });
  }
  if (!email) {
    message = '"email" is required';
    return res.status(InvalidRequest).json({ message });
  }
  if (!emailValidate(email)) {
    message = '"email" must be a valid email';
    return res.status(InvalidRequest).json({ message });
  }
  if (!password) {
    message = '"password" is required';
    return res.status(InvalidRequest).json({ message });
  }
  if (String(password).length < 6) {
    message = '"password" length must be 6 characters long';
    return res.status(InvalidRequest).json({ message });
  }
  return next();
};

module.exports = { UserValidate };
