const { User } = require('../models');
const validations = require('../helpers/validations');

const getUserValidation = async (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        const err = validations.userDoesNotExistsError();
        return res.status(err.status).json(err);
      }
      return res.status(200).json(user);
    })
    .catch((e) => {
      console.error(e);
    });
};

module.exports = getUserValidation;
