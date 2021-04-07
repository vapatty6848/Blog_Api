const { UsersServices } = require('../services');

const create = async (req, res) => {
  const { email } = req.body;
  const createToken = await UsersServices.createToken({ email });
  return res.status(201).json({ token: createToken });
};

const createTokenLogin = async (req, res) => {
  const { email } = req.body;
  const createToken = await UsersServices.createToken({ email });
  return res.status(200).json({ token: createToken });
};

module.exports = { create, createTokenLogin };
