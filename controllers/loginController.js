const { Router } = require('express');
const { isAnEmail, isAPassword, emailAlreadyExists } = require('../middlewares/userValidations');
const { statusCode, statusMsg } = require('../utils/dictionary');
const tokenCreation = require('../middlewares/tokenCreation');

const loginRouter = Router();

loginRouter.post('/', isAnEmail, isAPassword, async (req, res) => {
  const { email } = req.body;
  const UserDB = await emailAlreadyExists(email);
  if (UserDB === null) {
    return res.status(statusCode.BAD_REQUEST).send({ message: statusMsg.FIELD_INVALID });
  }
  const token = tokenCreation(UserDB.displayName, email);
  return res.status(statusCode.SUCCESS).send({ token });
});

module.exports = loginRouter;
