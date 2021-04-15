const BAD_REQUEST = 400;

const validContent = (req, res, next) => {
  const { content } = req.body;

  if (!content || content === ' ') {
    return res.status(BAD_REQUEST).send({ message: '"content" is required' });
  }
  next();
};

const validTitle = (req, res, next) => {
  const { title } = req.body;

  if (!title || title === ' ') {
    return res.status(BAD_REQUEST).send({ message: '"title" is required' });
  }
  next();
};

module.exports = { validContent, validTitle };
