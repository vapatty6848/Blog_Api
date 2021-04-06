const { isFalsy } = require('./helpers');

module.exports = (title, content) => {
  switch (true) {
    case (isFalsy(title) && title !== ''): throw new Error('C_ERR_POST_TITLE_REQ');
    case (isFalsy(content) && content !== ''): throw new Error('C_ERR_POST_CONT_REQ');
    default: break;
  }
};
