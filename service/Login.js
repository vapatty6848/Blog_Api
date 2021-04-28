const { User } = require('../models');
const tokenCreator = require('../middleware/tokenCreator');

const login = async ({ email, password }) => {
  try {
    if (email === undefined) return { status: 400, message: '"email" is required' };
    if (password === undefined) return { status: 400, message: '"password" is required' };
    if (email === '') return { status: 400, message: '"email" is not allowed to be empty' };
    if (password === '') return { status: 400, message: '"password" is not allowed to be empty' };
    const foundUser = await User.findAll({ where: { email } });
    if (foundUser.length === 0) return { status: 400, message: 'Campos inválidos' };
    if (foundUser[0].password !== password) return { status: 400, message: 'Senha inválida' };
    return tokenCreator(foundUser);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  login,
};
