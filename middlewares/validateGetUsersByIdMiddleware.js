const decodeToken = require('../utils/decodeToken');

const { User } = require('../models');
const { haveTokenField } = require('../utils/validations');

const validateGetUsersById = async (req, res, _next) => {
  try {
    if (!haveTokenField(req.headers)) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    await decodeToken(req.headers.authorization);

    const foundUser = await User.findByPk(parseInt(req.params.id, 10), { raw: true });

    if (foundUser === null) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    return res.status(200).json(foundUser);
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateGetUsersById;
