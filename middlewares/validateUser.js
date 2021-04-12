const { userSchema } = require('../schemas');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    const { error } = userSchema.validate({ displayName, email, password });
    if (error) return res.status(400).json({ message: error.details[0].message });
    const emailAlreadyExists = await User.findOne({
      where: {
        email,
      },
    });
    if (emailAlreadyExists) return res.status(409).json({ message: 'Usuário já existe' });
    next();
  } catch (err) {
    next(err);
  }
};
