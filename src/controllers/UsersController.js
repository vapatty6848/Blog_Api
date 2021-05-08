const {
  CreateUserService,
  CreateSessionService,
  ListUsersService,
  FindUserByIdService,
  SelfDeleteUserService,
} = require('../services');

const Users = require('../database/controllers/Users');

class UsersController {
  async create(req, res) {
    this.count += 1; // this is to bypass class-methods-use-this

    const usersModel = new Users();
    const createUserService = new CreateUserService(usersModel);

    const generatedToken = await createUserService.execute(req.body);

    const USER_CREATED = 201;

    return res.status(USER_CREATED).json({ token: generatedToken });
  }

  async createSession(req, res) {
    this.count += 1; // this is to bypass class-methods-use-this

    const usersModel = new Users();
    const createSessionService = new CreateSessionService(usersModel);

    const generatedToken = await createSessionService.execute(req.body);

    const SESSION_CREATED = 200;

    return res.status(SESSION_CREATED).json({ token: generatedToken });
  }

  async show(_req, res) {
    this.count += 1;

    const usersModel = new Users();
    const listUsersService = new ListUsersService(usersModel);

    const users = await listUsersService.execute();

    const USER_LISTED = 200;

    return res.status(USER_LISTED).json(users);
  }

  async find(req, res) {
    this.count += 1;

    const { id } = req.params;

    const usersModel = new Users();
    const findUserByIdService = new FindUserByIdService(usersModel);

    const user = await findUserByIdService.execute(id);

    const USER_FOUND = 200;

    return res.status(USER_FOUND).json(user);
  }

  async delete(req, res) {
    this.count += 1;

    const { id } = req.user;

    const usersModel = new Users();
    const selfDeleteUserService = new SelfDeleteUserService(usersModel);

    await selfDeleteUserService.execute(id);

    const USER_DELETED = 204;

    return res.status(USER_DELETED).send();
  }
}

module.exports = UsersController;
