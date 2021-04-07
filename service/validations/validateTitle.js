const BAD_REQUEST = 400;

const nullTitle = {
  payload: { message: '"title" is required' },
  status: BAD_REQUEST,
};

const validateTitle = (title) => {
  if (!title) return nullTitle;

  return true;
};

module.exports = validateTitle;
