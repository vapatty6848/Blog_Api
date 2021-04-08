const findByEmail = require('../utils/findByEmail');

const BAD = 400;

const msgNullEmail = { message: '"email" is required' };
const msgNullPass = { message: '"password" is required' };
const msgEmpEmail = { message: '"email" is not allowed to be empty' };
const msgEmpPass = { message: '"password" is not allowed to be empty' };
const invFields = { message: 'Campos inválidos' };

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (email === '') return res.status(BAD).json(msgEmpEmail);
  if (password === '') return res.status(BAD).json(msgEmpPass);
  if (!email) return res.status(BAD).json(msgNullEmail);
  if (!password) return res.status(BAD).json(msgNullPass);

  const verify = await findByEmail(email);
  if (!verify[0]) return res.status(BAD).json(invFields);
  next();
};

module.exports = validateLogin;
