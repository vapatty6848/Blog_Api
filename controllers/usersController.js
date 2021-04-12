const services = require('../services/usersServices');

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const token = await services.createUser(newUser);

    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = createUser;
