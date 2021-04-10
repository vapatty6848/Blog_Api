const userService = require('../../services/userService');

const verifications = (req, res, next) => {
  const { email, displayName, password } = req.body;

  if (displayName.length <= 7 || !displayName) return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });

  if (!password) return res.status(400).json({ message: '"password" is required' });

  if (password.length <= 5) return res.status(400).json({ message: '"password" length must be 6 characters long' });

  if (!email) return res.status(400).json({ message: '"email" is required' });

  const regexMail = /^[a-z0-9.]+@[a-z]+[a-z0-9]*\.[a-z]+(\.[a-z]+)?$/i;
  if (!regexMail.test(email)) return res.status(400).json({ message: '"email" must be a valid email' });
  next();
};

async function checkEmailUser(req, res, next) {
  const { email } = req.body;
  const existMailInDB = await userService.searchEmail(email);
  if (existMailInDB) return res.status(409).json({ message: 'Usuário já existe' });
  next();
}

async function checkMailLogin(req, res, next) {
  const { email, password } = req.body;
  const checkMail = await userService.searchEmail(email, password);
  console.log('checkMail', checkMail);
  if (!checkMail) return res.status(400).json({ message: 'Campos inválidos' });
  if (checkMail.password !== password) return res.status(400).json({ message: 'Campos inválidos' });
  next();
}

async function loginValidation(req, res, next) {
  const { email, password } = req.body;
  if (password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });
  if (!password) return res.status(400).json({ message: '"password" is required' });
  if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });
  if (!email) return res.status(400).json({ message: '"email" is required' });
  const regexMail = /^[a-z0-9.]+@[a-z]+[a-z0-9]*\.[a-z]+(\.[a-z]+)?$/i;
  if (!regexMail.test(email)) return res.status(400).json({ message: '"email" must be a valid email' });
  next();
}

module.exports = {
  verifications,
  checkEmailUser,
  checkMailLogin,
  loginValidation,
};
