const { BAD_REQUEST } = require('../errors/status');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === '') return res.status(BAD_REQUEST).json({ message: '"email" is not allowed to be empty' });
  if (password === '') return res.status(BAD_REQUEST).json({ message: '"password" is not allowed to be empty' });

  if (!email) return res.status(BAD_REQUEST).json({ message: '"email" is required' });
  if (!password) return res.status(BAD_REQUEST).json({ message: '"password" is required' });

  next();
};
