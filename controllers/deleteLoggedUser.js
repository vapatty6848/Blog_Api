const { verifyToken } = require('../helpers/utils');
const { User } = require('../models');

const deleteLoggedUser = async (req, res) => {
  const token = req.headers.authorization;
  const user = verifyToken(token);
  User.destroy({
    where: {
      email: user,
    },
  }).then(() => res.status(204).json())
    .catch((e) => {
      console.error(e);
    });
};

module.exports = deleteLoggedUser;
