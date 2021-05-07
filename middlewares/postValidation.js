const BAD_REQUEST = 400;

const postValidation = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(BAD_REQUEST).json(
      {
        message: '"title" is required',
      },
    );
  }

  if (!content) {
    return res.status(BAD_REQUEST).json(
      {
        message: '"content" is required',
      },
    );
  }
  return next();
};

module.exports = { postValidation };
