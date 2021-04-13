const { postSchema } = require('../schemas/PostSchema');
// const validateRegister = require('./validateRegister');

const validatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    await postSchema.validate({ title, content });
    // await validateRegister(req, res, next);
  } catch (err) {
    err.status = 400;
    return next(err);
  }
  next();
};

module.exports = {
  validatePost,
};
