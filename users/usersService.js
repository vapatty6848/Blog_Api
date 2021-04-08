const { Users } = require('../models');

const generateToken = require('../token/generateToken');

const createUser = async (displayName, email, password, image) => {
  console.log('service users');
  console.log(displayName, email, password, image);

  const userExists = await Users.findOne({ where: { email } });
  if (userExists === null) {
    // se o email nao está cadastrado, não existe um usuário, então, criar um:
    // - inserir no banco e gerar um token
    const createdUser = await Users.create({ displayName, email, password, image });
    const { dataValues: { id } } = createdUser;
    console.log('ID', id);
    // criar o token e retornar ele aqui embaixo:
    const token = await generateToken({ id, email });
    return { token };
  }

  return { message: 'Usuário já existe' };
};

module.exports = {
  createUser,
};
