const services = require('../services/loginServices');

const authenticateUser = async (req, res, next) => {
  try {
    const userCredentials = req.body;
    const token = await services.authenticateUser(userCredentials);

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticateUser };
