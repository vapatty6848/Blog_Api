const { User } = require('../models');
const generateToken = require('../auth/generateToken');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    await User.create({ displayName, email, password, image });
    const token = generateToken(email);
    return res
      .status(201)
      .json({ token });
  } catch (error) {
    console.log(error);
    if (error.original.code === 'ER_DUP_ENTRY') {
      return res
        .status(409)
        .json({ message: 'Usuário já existe' });
    }
    return res.status(500).json({ message: 'Deu erro' });
  }
};

const getAll = async (req, res) => {
  try {
    const allUser = await User.findAll();
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const findByID = async (req, res) => {
  const { id } = req.params;
  try {
    const userByID = await User.findByPk(id);
    if (userByID === null) {
      return res
        .status(404)
        .json({ message: 'Usuário não existe' });
    }
    return res
      .status(200)
      .json(userByID);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const deleteMe = async (req, res) => {
  const { email } = req.user.data;
  try {
    const userDeleted = await User.destroy({
      where: { email },
    });
    console.log(userDeleted);
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  createUser,
  getAll,
  findByID,
  deleteMe,
};
