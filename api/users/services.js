const model = require('./model');
const generateToken = require('../utils/generateToken');

const create = async ({ body }) => {
  const { displayName, email, password, image } = body;
  const users = await model.findAll('email', body.email);

  if (users.length > 0) {
    const message = 'Usuário já existe';
    return ({ status: 409, payload: { message } });
  }

  const user = await model.create({ email, displayName, image, password });
  const { id } = user;

  if (id) {
    const token = generateToken({ id });
    return ({ status: 201, payload: { token } });
  }

  return ({ status: 400, payload: { message: 'Erro interno' } });
};

const getAll = async () => {
  const users = await model.getAll();

  if (!users) {
    const message = 'Erro interno';
    return ({ status: 400, payload: { message } });
  }

  return ({ status: 200, payload: users });
};

const getOne = async ({ params }) => {
  const { id } = params;
  const user = await model.findById(id);

  if (!user) {
    const message = 'Usuário não existe';
    return ({ status: 404, payload: { message } });
  }

  return ({ status: 200, payload: user });
};

const remove = async ({ user }) => {
  const deleteStatus = await user.destroy();

  if (!deleteStatus) {
    const message = 'Erro  interno';
    return ({ status: 400, payload: { message } });
  }

  return ({ status: 204, payload: { message: 'Usuário deletado com sucesso' } });
};

module.exports = { create, getAll, getOne, remove };
