const createUser = async (req, res) => {
  res.status(200).json({ message: 'createUser' });
};

const getUserById = async (req, res) => {
  res.status(200).json({ message: 'getUserById' });
};

const getAllUsers = async (req, res) => {
  res.status(200).json({ message: 'getAllUsers' });
};

const deleteUser = async (req, res) => {
  res.status(200).json({ message: 'deleteUser' });
};

const login = async (req, res) => {
  res.status(200).json({ message: 'login' });
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  deleteUser,
  login,
};
