const {
  isUserNameValid,
  isEmailValid,
  isBlank,
  isLessThan,
} = require('../helpers');

const error = {
  nameFieldRequired: 'C_ERR_NAME_REQ',
  invalidName: 'C_ERR_NAME_INVALID',
  emailFieldRequired: 'C_ERR_EMAIL_REQ',
  invalidEmail: 'C_ERR_EMAIL_INVALID',
  invalidPassword: 'C_ERR_PASS_INVALID',
  passwordFieldRequired: 'C_ERR_PASS_REQ',
  incorrectPrice: 'C_ERR_PRICE',
};

const validateUserName = (name) => {
  switch (true) {
    case isBlank(name): throw new Error(error.nameFieldRequired);
    case isUserNameValid(name): throw new Error(error.invalidName);
    default: return null;
  }
};

const validateEmailField = (email) => {
  switch (true) {
    case isBlank(email): throw new Error(error.emailFieldRequired);
    case isEmailValid(email): throw new Error(error.invalidEmail);
    default: return null;
  }
};

const validatePasswordField = (pass) => {
  switch (true) {
    case isBlank(pass): throw new Error(error.passwordFieldRequired);
    case isLessThan(pass.length, 6): throw new Error(error.invalidPassword);
    default: return null;
  }
};

const validateSaleTotal = async (sale, products, salePrice) => {
  const totalPrice = Number(sale.reduce((acc, { productId, quantity }) =>
    acc + Number(products.find((el) => el.id === productId).price) * quantity, 0).toFixed(2));

  if (Number(salePrice) !== totalPrice) throw new Error(error.incorrectPrice);
};

module.exports = {
  validateUserName,
  validateEmailField,
  validatePasswordField,
  validateSaleTotal,
};
