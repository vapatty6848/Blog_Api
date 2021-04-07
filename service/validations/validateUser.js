const { User } = require('../../models');

const NOT_FOUND = 404;

const invalidUserId = {
  payload: { message: 'Usuário não existe' },
  status: NOT_FOUND,
};

const validateUser = async ({ id }) => {
  const result = await User.findAll({
    where: { id },
  });

  if (!result.length) return invalidUserId;
  return result;
};

module.exports = validateUser;
