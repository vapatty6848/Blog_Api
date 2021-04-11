const decodeToken = require('../utils/decodeToken');

const { User } = require('../models');
const { haveTokenField } = require('../utils/validations');

const validateDeleteUsers = async (req, res, _next) => {
  try {
    if (!haveTokenField(req.headers)) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    await decodeToken(req.headers.authorization);

    const foundUser = await User.findOne({ raw: true }, {
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    const { id } = foundUser;

    await User.destroy({ where: { id } });

    return res.status(204).json({ message: 'Usuário deletado' });
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateDeleteUsers;
