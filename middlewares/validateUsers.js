const usersServices = require('../services/UserServices');

const BADREQUEST = 400;
const CONFLICT = 409;

function validatedUsers(req, res, next) {
  const { displayName, email, password } = req.body;
  if (displayName.length <= 7 || !displayName) {
    return res.status(BADREQUEST)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!password) {
    return res.status(BADREQUEST).json({ message: '"password" is required' });
  }
  if (password.length <= 5) {
    return res.status(BADREQUEST).json({ message: '"password" length must be 6 characters long' });
  }
  if (!email) {
    return res.status(BADREQUEST).json({ message: '"email" is required' });
  }
  const regex = /^[a-z0-9.]+@[a-z]+[a-z0-9]*\.[a-z]+(\.[a-z]+)?$/i;
  if (!regex.test(email)) {
    return res.status(BADREQUEST).json({ message: '"email" must be a valid email' });
  }
  next();
}

async function verifyEmailUser(req, res, next) {
  const { email } = req.body;
  const existEmailReturn = await usersServices.findEmailExist(email);
  if (existEmailReturn) {
    return res.status(CONFLICT).json({ message: 'Usuário já existe' });
  }
  next();
}

async function verifyEmailLogin(req, res, next) {
  const { email, password } = req.body;
  const existEmailReturn = await usersServices.findEmailExist(email, password);
  console.log(' email', existEmailReturn);
  if (!existEmailReturn) {
    return res.status(BADREQUEST).json({ message: 'Campos inválidos' });
  }
  if (existEmailReturn.password !== password) {
    return res.status(BADREQUEST).json({ message: 'Campos inválidos' });
  }
  next();
}

async function validatedLogin(req, res, next) {
  const { email, password } = req.body;
  if (password === '') {
    return res.status(BADREQUEST).json({ message: '"password" is not allowed to be empty' });
  }
  if (!password) {
    return res.status(BADREQUEST).json({ message: '"password" is required' });
  }

  if (email === '') {
    return res.status(BADREQUEST).json({ message: '"email" is not allowed to be empty' });
  }
  if (!email) {
    return res.status(BADREQUEST).json({ message: '"email" is required' });
  }
  const regex = /^[a-z0-9.]+@[a-z]+[a-z0-9]*\.[a-z]+(\.[a-z]+)?$/i;
  if (!regex.test(email)) {
    return res.status(BADREQUEST).json({ message: '"email" must be a valid email' });
  }
  next();
}
module.exports = {
  validatedUsers,
  verifyEmailUser,
  verifyEmailLogin,
  validatedLogin,
};
