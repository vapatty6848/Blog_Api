const { validateName } = require('./validateUser');

const badRequest = 400;

const verifyName = (req, res, next) => {
  const { displayName } = req.body;

  if (!validateName(displayName)) {
    return res.status(badRequest).json({ message: '"displayName" length must be at least 8 characters long' });
  }

  next();
};

module.exports = verifyName;
