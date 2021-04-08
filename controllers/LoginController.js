const { createToken } = require('../middlewares/CheckToken');

const { OK } = require('../schema/statusSchema');

const login = async (req, res) => {
  // req.user is returned in LoginMiddleware
  const userValid = req.user;
  const token = createToken(userValid);

  res.status(OK).json({ token });
};

module.exports = {
  login,
};
