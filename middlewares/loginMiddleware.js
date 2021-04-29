const { User } = require('../models');
const generateToken = require('../auth/generateToken');

const login = async (req, res) => {
  const { email } = req.body;
  try {
    const foundUser = await User.findOne({
      where: { email },
    });
    if (foundUser === null) {
      res.status(400).json({ message: 'Campos inválidos' });
    }
    const token = generateToken(email);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json('deu ruim');
  }
};

module.exports = {
  login,
};
