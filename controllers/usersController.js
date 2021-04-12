const services = require('../services/usersServices');

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const token = await services.createUser(newUser);

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser };
