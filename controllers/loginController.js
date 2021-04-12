const services = require('../services/loginServices');

const authenticateUser = async (req, res, next) => {
  try {
    const userCredentials = req.body;
    const token = await services.authenticateUser(userCredentials);

    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = { authenticateUser };
