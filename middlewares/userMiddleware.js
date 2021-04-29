const { User } = require('../models');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    await User.create({ displayName, email, password, image });
    res
      .status(201)
      // .json({ message: 'Usuário criado' });
      .json({ token: 'blá-blá-blá' });
  } catch (error) {
    console.log(error);
    if (error.original.code === 'ER_DUP_ENTRY') {
      return res
        .status(409)
        .json({ message: 'Usuário já existe' });
    }
    res.status(500).json({ message: 'Deu erro' });
  }
};

const getAll = async (req, res) => {
  try {
    const allUser = await User.findAll();
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  createUser,
  getAll,
};
