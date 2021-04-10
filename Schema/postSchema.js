const empty = (value) => (value === undefined);

const errorCode = 400;

const validatePostFields = (title, content) => {
  switch (true) {
    case empty(title): return { errorCode, message: 'title' };
    case empty(content): return { errorCode, message: 'content' };
    default: return {};
  }
};

module.exports = {
  validatePostFields,
};
