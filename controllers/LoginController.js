const { createToken } = require('../middlewares/CheckToken');

const { OK } = require('../schema/statusSchema');

const login = async (req, res) => {
  const userValid = req.user;
  const token = await createToken(userValid);

  res.status(OK).json({ token });
};

module.exports = {
  login,
};
