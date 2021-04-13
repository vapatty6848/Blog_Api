const validateTitleEntries = (req, _res, next) => {
  const { title } = req.body;

  if (!title) {
    return next({
      status: 400,
      message: '"title" is required',
    });
  }
  next();
};

const validateContentEntries = (req, _res, next) => {
  const { content } = req.body;

  if (!content) {
    return next({
      status: 400,
      message: '"content" is required',
    });
  }
  next();
};

module.exports = {
  validateTitleEntries,
  validateContentEntries,
};
