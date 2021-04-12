const decodeToken = require('../utils/decodeToken');

const {
  haveTitleField,
  haveContentField,
  haveTokenField } = require('../utils/validations');

const validateCreateUser = async (req, res, next) => {
  try {
    if (!haveTitleField(req.body)) {
      return res.status(400).json({ message: '"title" is required' });
    }
    if (!haveContentField(req.body)) {
      return res.status(400).json({ message: '"content" is required' });
    }
    if (!haveTokenField(req.headers)) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    await decodeToken(req.headers.authorization);
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  next();
};

module.exports = validateCreateUser;
