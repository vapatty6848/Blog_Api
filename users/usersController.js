const usersService = require('./usersService');

const createUser = async (req, res) => {
  console.log('controller');
  const { displayName, email, password, image } = req.body;

  const { message, token } = await usersService.createUser(displayName, email, password, image);

  if (message) return res.status(409).json({ message });

  res.status(201).json({ token });
};

module.exports = {
  createUser,
};
