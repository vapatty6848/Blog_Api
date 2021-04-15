const yup = require('yup');

const userSchema = yup.object().shape({
  displayName: yup.string()
    .min(8, "\"displayName\" length must be at least 8 characters long")
    .required("\"displayName\" length must be at least 8 characters long"),
  email: yup.string()
    .required("\"email\" is required")
    .matches(/^[\w]+[@\w]+\.+\w/i, '\"email\" must be a valid email'),
  password: yup.string()
    .min(6, '\"password\" length must be 6 characters long')
    .required('\"password\" is required'),

});

module.exports = userSchema;
