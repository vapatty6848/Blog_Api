const { Users } = require('../models');

const generateToken = require('../token/generateToken');

exports.login = async (requestEmail, requestPassword) => {
  console.log('LOGIN SERVICE');

  const userExists = await Users.findOne({ where: { email: requestEmail } });
  if (userExists === null) {
    return { message: 'Campos inválidos' };
  }
  const { dataValues: { email, password, id } } = userExists;

  if (requestEmail !== email || requestPassword !== password) {
    return { message: 'Campos inválidos' };
  }

  const token = await generateToken({ id, email });
  return { token };
};
