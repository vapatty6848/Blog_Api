const PostService = require('../service/PostService');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;

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

const postIdExist = async (req, res, next) => {
  const { id } = req.params;
  const postExist = await PostService.findPostById(id);

  if (postExist === null) {
    return res.status(NOT_FOUND).json({ message: 'Post não existe' });
  }
  next();
};

module.exports = {
  validateFields,
  postIdExist,
};
