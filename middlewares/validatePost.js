const { BAD_REQUEST } = require('../helper/statusCodes');

const validatePost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) return res.status(BAD_REQUEST).json({ message: '"title" is required' });
  if (!content) return res.status(BAD_REQUEST).json({ message: '"content" is required' });
  next();
};

module.exports = validatePost;
