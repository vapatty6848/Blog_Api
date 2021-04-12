const { session } = require('../services');

module.exports = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await session.login(email);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
