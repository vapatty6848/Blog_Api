const emailValidation = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailCheck = regex.test(email);
  return emailCheck;
};
const minLength = 8;
const BAD_REQUEST = 400;
const registerValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (displayName.length < minLength) {
    return res.status(BAD_REQUEST).json({ message: '"displayName" length must be at least 8 characters long' });
  } if (!email) {
    return res.status(BAD_REQUEST).json({ message: '"email" is required' });
  } if (!emailValidation(email)) {
    return res.status(BAD_REQUEST).json({ message: '"email" must be a valid email' });
  } if (!password) {
    return res.status(BAD_REQUEST).json({ message: '"password" is required' });
  } if (String(password).length < 6) {
    return res.status(BAD_REQUEST).json({ message: '"password" length must be 6 characters long' });
  }
  return next();
};
module.exports = { registerValidation, emailValidation };
