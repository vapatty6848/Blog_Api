const { User } = require('../../models');

const getUsersController = async (req, res) => {
  // const { userData } = req;
  // const { id } = res.locals.user;
  console.log(req.userId);
  const users = await User.findAll();
  res.status(200).json(users);
};

module.exports = getUsersController;
