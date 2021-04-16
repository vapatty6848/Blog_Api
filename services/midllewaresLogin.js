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

const validEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    const isEmailValid = email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z.]+$/);
    if (!isEmailValid) {
      return res.status(400).json({ message: 'Campos inválidos' });
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
      return res.status(400).json({ message: 'Campos inválidos' });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = {
  validEmail,
  validPassword,
  existEmail,
};
