const msgInValidDisplayName = '"displayName" length must be at least 8 characters long';
const msgInvalidEmail = '"email" must be a valid email';
const msgInvalidPassword = '"password" length must be 6 characters long';

const displayNameChecked = (req, res, next) => {
  try {
    const { displayName } = req.body;
    if (!displayName || displayName.length < 8) {
      return res.status(400).json({ message: msgInValidDisplayName });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

const validEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    const isEmailValid = email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z.]+$/);
    if (!isEmailValid) {
      return res.status(400).json({ message: msgInvalidEmail });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

const validPassword = (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: '"password" is required' });
    }
    if (password.length !== 6) {
      return res.status(400).json({ message: msgInvalidPassword });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

const existEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: '"email" is required' });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = {
  displayNameChecked,
  validEmail,
  validPassword,
  existEmail,
};
