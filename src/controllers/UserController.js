const CreateUserService = require('../services/CreateUserService');

const CREATED = 201;

module.exports = {
  async createUser(req, res) {
    const token = await CreateUserService.execute(req.body);

    return res.status(CREATED).json({ token });
  },
};
