const { createToken } = require('../services/Auth');
const { User } = require('../models');

const generateToken = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  const token = await createToken(user.dataValues);
  return res.status(req.status).json({ token });
};

module.exports = {
  generateToken,
};
