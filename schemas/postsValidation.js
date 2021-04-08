const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('../document/HTTPStatus');

const obj = {
  title: '"title" is required',
  content: '"content" is required',
};

const validatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || title.length === '') {
      return res.status(BAD_REQUEST).json({ message: obj.title });
    }
    if (!content || content.length === '') {
      return res.status(BAD_REQUEST).json({ message: obj.content });
    }
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
  next();
};

module.exports = {
  validatePost,
};
