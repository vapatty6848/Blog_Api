const { User } = require('../models');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    await User.create({ displayName, email, password, image });
    res
      .status(201)
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
  res.send('tá no controle');
};

module.exports = {
  createUser,
};
