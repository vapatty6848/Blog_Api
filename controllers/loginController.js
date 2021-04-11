const { Router } = require('express');

const loginController = Router();

loginController.post('/login', async (_req, res) => {
  res.status(200).json({ message: 'ok' });
});

module.exports = loginController;
