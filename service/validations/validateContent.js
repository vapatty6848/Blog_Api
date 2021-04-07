const BAD_REQUEST = 400;

const nullContent = {
  payload: { message: '"content" is required' },
  status: BAD_REQUEST,
};

const validateContent = (content) => {
  if (!content) return nullContent;

  return true;
};

module.exports = validateContent;
