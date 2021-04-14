const CreateUserService = require('../services/CreateUserService');
const GetAllUsersService = require('../services/GetAllUsersService');

const OK = 200;
const CREATED = 201;

module.exports = {
  async createUser(req, res) {
    const token = await CreateUserService.execute(req.body);

    return res.status(CREATED).json({ token });
  },

  async getAllUsers(_req, res) {
    const users = await GetAllUsersService.execute();

    return res.status(OK).json(users);
  },
};
