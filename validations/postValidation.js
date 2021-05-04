const { StatusCodes } = require('http-status-codes');
const CustomErr = require('../utils/customErr');

module.exports = (title, content) => {
  if (!title) throw new CustomErr(StatusCodes.BAD_REQUEST, '"title" is required');
  if (!content) throw new CustomErr(StatusCodes.BAD_REQUEST, '"content" is required');
};
