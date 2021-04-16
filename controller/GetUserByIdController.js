const { User } = require('../models');

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  console.log(user);
  res.status(200).json(user);
};

module.exports = getUserById;
