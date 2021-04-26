const { User } = require('../models');
const tokenCreator = require('../middleware/tokenCreator');

const login = async (email, password, res) => {
  try {
    if (email === null) return res.status(400).json({ message: '"email" is required' });
    if (password === null) return res.status(400).json({ message: '"password" is required' });
    if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });
    if (password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });
    const foundUser = await User.findOne({ where: { email } });
    console.log(foundUser);
    if (foundUser.password !== password) return res.status(400).json({ message: 'Campos inválidos' });
    return tokenCreator(foundUser);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  login,
};
