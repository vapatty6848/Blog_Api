const { User } = require('../models');

const getUserByIdValidation = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });
  next();
};

module.exports = getUserByIdValidation;
