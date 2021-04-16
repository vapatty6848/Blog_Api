const { Router } = require('express');

const loginRouter = Router();

loginRouter.post('/',
  async (req, res) => {
    try {
      return res.status(201).json({ login: 'newUser' });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = loginRouter;
