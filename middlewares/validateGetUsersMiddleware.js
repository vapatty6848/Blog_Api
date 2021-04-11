const decodeToken = require('../utils/decodeToken');

const { User } = require('../models');
const { haveTokenField } = require('../utils/validations');

const validateGetUsers = async (req, res, _next) => {
  try {
    if (!haveTokenField(req.headers)) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    await decodeToken(req.headers.authorization);
    const getAllUsers = await User.findAll({ raw: true });
    return res.status(200).json(getAllUsers);
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateGetUsers;
