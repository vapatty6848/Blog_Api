const { StatusCodes } = require('http-status-codes');

const CustomErr = require('../utils/customErr');

module.exports = (email, password) => {
  switch (true) {
    case (email === ''): throw new CustomErr(StatusCodes.BAD_REQUEST, '"email" is not allowed to be empty');
    case (password === ''): throw new CustomErr(StatusCodes.BAD_REQUEST, '"password" is not allowed to be empty');
    case (!email): throw new CustomErr(StatusCodes.BAD_REQUEST, '"email" is required');
    case (!password): throw new CustomErr(StatusCodes.BAD_REQUEST, '"password" is required');
    default: break;
  }
};
