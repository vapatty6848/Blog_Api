const { BAD_REQUEST } = require('../errors/status');

module.exports = async (req, res, next) => {
  const { title, content } = req.body;

  if (!title) return res.status(BAD_REQUEST).json({ message: '"title" is required' });
  if (!content) return res.status(BAD_REQUEST).json({ message: '"content" is required' });

  next();
};
