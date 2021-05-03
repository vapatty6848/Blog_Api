const { User } = require('../../models');

const deleteMyUserController = async (req, res) => {
  const { payload } = req;
  await User.destroy({ where: { email: payload.email } });
  res.status(204).json();
};

module.exports = deleteMyUserController;
