const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

module.exports = (req, res, next) => {
  try {
    const {
      displayName, email, password,
    } = req.body;

    const regex = /\S+@\S+\.\S+/;
    const minimumPasswordLength = 6;
    const minimumNameLength = 8;

    if (!displayName || displayName.length < minimumNameLength) {
      return res.status(BAD_REQUEST).json({
        message: '"displayName" length must be at least 8 characters long',
      });
    }
    if (!email || !email.length) {
      return res.status(BAD_REQUEST).json({
        message: '"email" is required',
      });
    }
    if (!regex.test(email)) {
      return res.status(BAD_REQUEST).json({
        message: '"email" must be a valid email',
      });
    }
    if (!password) {
      return res.status(BAD_REQUEST).json({
        message: '"password" is required',
      });
    }
    if (password.length < minimumPasswordLength) {
      return res.status(BAD_REQUEST).json({
        message: '"password" length must be 6 characters long',
      });
    }
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'deu pau aqui' });
  }

  next();
};
