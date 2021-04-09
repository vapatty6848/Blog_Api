const { User } = require('../models');

const DeleteUserService = async (id) => {
  await User.destroy({
    where: { id },
  });
};

module.exports = DeleteUserService;
