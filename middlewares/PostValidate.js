const badRequest = 400;

const postValidate = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    const message = '"title" is required';

    return res.status(badRequest).json({ message });
  }
  if (!content) {
    const message = '"content" is required';

    return res.status(badRequest).json({ message });
  }
  next();
};

module.exports = {
  postValidate,
};
