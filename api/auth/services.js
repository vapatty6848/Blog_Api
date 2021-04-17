// const bcrypt = require('bcrypt');
const model = require('./model');
const generateToken = require('../utils/generateToken');

const login = async ({ body }) => {
  const user = await model.findOne('email', body.email);
  if (!user) return ({ status: 400, payload: { message: 'Campos inválidos' } });

  // const passwordIsValid = await bcrypt.compare(body.password, user.password);
  const passwordIsValid = body.password === user.password;
  if (!passwordIsValid) return ({ status: 400, payload: { message: 'Campos inválidos' } });

  const token = generateToken({ id: user.id });
  return ({ status: 200, payload: { token } });
};

module.exports = { login };
