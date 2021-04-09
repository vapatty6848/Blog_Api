const UNPROCESS = 400;

const verifyEmailLoginController = async (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(UNPROCESS).json({ message: '"email" is required' });
  }
  if (email.length === 0) {
    return res.status(UNPROCESS).json({ message: '"email" is not allowed to be empty' });
  }

  next();
};

module.exports = verifyEmailLoginController;
