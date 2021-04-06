const userDataSchema = {
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  displayName: {
    type: String,
    required: true,
    minlength: 8,
  },
  image: {
    type: String,
  },
};

module.exports = userDataSchema;
