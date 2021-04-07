const emailValidate = (email) => {
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regex.test(email);
};

const InvalidRequest = 400;
let message = '';

const LoginValidate = (req, res, next) => {
  const { email, password } = req.body;

  if (email === '') {
    message = '"email" is not allowed to be empty';
    return res.status(InvalidRequest).json({ message });
  }
  if (email === undefined) {
    message = '"email" is required';
    return res.status(InvalidRequest).json({ message });
  }
  if (!emailValidate(email)) {
    message = '"email" must be a valid email';
    return res.status(InvalidRequest).json({ message });
  }
  if (password === '') {
    message = '"password" is not allowed to be empty';
    return res.status(InvalidRequest).json({ message });
  }
  if (password === undefined) {
    message = '"password" is required';
    return res.status(InvalidRequest).json({ message });
  }
  return next();
};

module.exports = { LoginValidate };
