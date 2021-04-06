const { isFalsy, isLessThan, isEmailInvalid } = require('./helpers');

module.exports = (email, password) => {
  console.log('run login validation');
  switch (true) {
    case (isFalsy(email) && email !== ''): throw new Error('C_ERR_EMAIL_REQ');
    case (isFalsy(password) && password !== ''): throw new Error('C_ERR_PASS_REQ');
    case isLessThan(email.length, 1): throw new Error('C_ERR_EMAIL_EMPTY');
    case isLessThan(password.length, 1): throw new Error('C_ERR_PASS_EMPTY');
    case isEmailInvalid(email): throw new Error('C_ERR_EMAIL_INVALID');
    default: break;
  }
};
