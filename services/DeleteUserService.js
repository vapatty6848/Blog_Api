const { User } = require('../models');

const DeleteUserService = async (id) => {
  await User.destroy({
    where: { id },
  });
  return 0;
};

module.exports = DeleteUserService;
