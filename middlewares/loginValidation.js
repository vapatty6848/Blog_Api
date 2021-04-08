const { checkEmail, generateToken } = require('../helpers/utils');

const loginValidation = async (req, res, _next) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  const user = await checkEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  const token = generateToken(email);
  return res.status(200).json({ token });
};

module.exports = loginValidation;
