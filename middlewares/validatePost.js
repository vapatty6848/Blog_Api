const BAD = 400;

const msgNullTitle = { message: '"title" is required' };
const msgNullCont = { message: '"content" is required' };

const validatePost = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title) return res.status(BAD).json(msgNullTitle);
  if (!content) return res.status(BAD).json(msgNullCont);
  next();
};

module.exports = validatePost;
