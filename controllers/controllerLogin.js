const { Router } = require('express');
const rescue = require('express-rescue');

const router = Router();
const createToken = require('../middlewares/Req1/createToken');
const { checkMailLogin, loginValidation } = require('../middlewares/Req1/verifications');

router.post('/', loginValidation, checkMailLogin, rescue(async (req, res) => {
  const { email } = req.body;

  const tokenUser = { email };
  const token = createToken(tokenUser);

  return res.status(200).json({ token });
}));

module.exports = router;
