const { User } = require('../models');
const generateToken = require('../auth/generateToken');

const login = async (req, res) => {
  const { email } = req.body;
  try {
    const foundUser = await User.findOne({
      where: { email },
    });
    if (foundUser === null) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }
    const token = generateToken(foundUser.email, foundUser.id);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json('deu ruim');
  }
};

module.exports = {
  login,
};
