const userSchema = require('./schemas/userSchema');

const validateUsers = async (req, _res, next) => {
  console.log(req.body);
  const { email, displayName, password } = req.body;
  try {
    await userSchema.validate({ email, displayName, password });
    return next();
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

module.exports = validateUsers;
