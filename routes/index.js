const router = require('express').Router();
const userController = require('../controllers/userController');
const {
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('../middlewares/validations');

router.get('/', (req, res) => {
  res.send('Teste testado...');
});

router.post('/', validateDisplayName, validateEmail, validatePassword, userController.createUser);

module.exports = router;
