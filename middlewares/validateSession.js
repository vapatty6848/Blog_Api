const { sessionSchema } = require('../schemas');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = sessionSchema.validate({ email, password });
    if (error) return res.status(400).json({ message: error.details[0].message });
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }
    next();
  } catch (err) {
    next(err);
  }
};
