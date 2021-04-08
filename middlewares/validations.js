const { ValidationDataServices } = require('../services');

const badRequest = 400;
const unauthorized = 401;

const verifyBodyData = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regexEmail = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+$/i;
  let message;
  switch (true) {
    case (displayName.length < 8):
      message = '"displayName" length must be at least 8 characters long';
      return res.status(badRequest).json({ message });
    case (!email):
      message = '"email" is required';
      return res.status(badRequest).json({ message });
    case (!regexEmail.test(email)):
      message = '"email" must be a valid email';
      return res.status(badRequest).json({ message });
    case (!password):
      message = '"password" is required';
      return res.status(badRequest).json({ message });
    case (password.length < 6):
      message = '"password" length must be 6 characters long';
      return res.status(badRequest).json({ message });
    default: console.log({ ok: true });
  }
  next();
};

const verifyBodyLogin = (req, res, next) => {
  const { email, password } = req.body;
  let message;
  switch (true) {
    case (email === ''):
      message = '"email" is not allowed to be empty';
      return res.status(badRequest).json({ message });
    case (!email):
      message = '"email" is required';
      return res.status(badRequest).json({ message });
    case (password === ''):
      message = '"password" is not allowed to be empty';
      return res.status(badRequest).json({ message });
    case (!password):
      message = '"password" is required';
      return res.status(badRequest).json({ message });
    default: console.log({ ok: true });
  }
  next();
};

const verifyAuthorization = async (req, res, next) => {
  const { authorization: token } = req.headers;
  let message;
  message = 'Token não encontrado';
  if (!token) return res.status(unauthorized).json({ message });
  message = 'Token expirado ou inválido';
  const payload = await ValidationDataServices.tokenValid(token);
  if (!payload) return res.status(unauthorized).json({ message });
  next();
};

const verifyBodyPost = async (req, res, next) => {
  const { content, title } = req.body;
  let message;
  switch (true) {
    case (!content):
      message = '"content" is required';
      return res.status(badRequest).json({ message });
    case (!title):
      message = '"title" is required';
      return res.status(badRequest).json({ message });
    default: console.log({ ok: true });
  }
  next();
};

module.exports = {
  verifyBodyData,
  verifyBodyLogin,
  verifyAuthorization,
  verifyBodyPost,
};
