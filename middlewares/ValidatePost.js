const BAD_REQUEST = 400;

const validatePost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    const message = '"title" is required';

    return res.status(BAD_REQUEST).json({ message });
  }
  if (!content) {
    const message = '"content" is required';

    return res.status(BAD_REQUEST).json({ message });
  }
  next();
};

module.exports = {
  validatePost,
};
