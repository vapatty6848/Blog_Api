require('dotenv').config();

const InvalidRequest = 400;

const PostValidate = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) return res.status(InvalidRequest).json({ message: '"title" is required' });
  if (!content) return res.status(InvalidRequest).json({ message: '"content" is required' });

  return next();
};

module.exports = { PostValidate };
