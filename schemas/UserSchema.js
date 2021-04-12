// import * as yup from 'yup';
const yup = require('yup');

const userSchema = yup.object().shape({
  displayName: yup.string()
    .min(8, '"displayName" length must be at least 8 characters long')
    .required('"displayName" is required'),
  email: yup.string()
    .email('"email" must be a valid email')
    .min(1, '"email" is not allowed to be empty')
    .required('"email" is required'),
  password: yup
    .string()
    .min(6, '"password" length must be 6 characters long')
    .required('"password" is required'),
});

const loginSchema = yup.object().shape({
  email: yup.string()
    .email('"email" must be a valid email')
    .min(1, '"email" is not allowed to be empty')
    .required('"email" is required'),
  password: yup.string()
    .min(6, '"password" length must be 6 characters long')
    .min(1, '"password" is not allowed to be empty')
    .required('"password" is required'),
});

module.exports = {
  userSchema,
  loginSchema,
};
