const BAD_REQUEST = 400;

const validateFields = (req, res, next) => {
  const { title, content } = req.body;
  if (title === undefined) {
    return res.status(BAD_REQUEST).json({ message: '"title" is required' });
  }
  if (content === undefined) {
    return res.status(BAD_REQUEST).json({ message: '"content" is required' });
  }
  next();
};

module.exports = {
  validateFields,
};
