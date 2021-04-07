const BAD_REQUEST = 400;

const invalidName = {
  payload: { message: '"displayName" length must be at least 8 characters long' },
  status: BAD_REQUEST,
};

const nullName = {
  payload: { message: '"name" is required' },
  status: BAD_REQUEST,
};

const validateName = (name) => {
  if (!name) return nullName;
  if (name.length < 8) return invalidName;
  return true;
};

module.exports = validateName;
