const { userSchema } = require('../schemas/UserSchema');

const validateUser = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    await userSchema.validate({ displayName, email, password });
    next();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = {
  validateUser,
};
