const UserRepository = require('../database/repositories/UserRepository');

const CreateUserService = require('../services/CreateUserService');
const ListUsersService = require('../services/ListUsersService');
const FindUserByIDService = require('../services/FindUserByIDService');
const DeleteSelfUserService = require('../services/DeleteSelfUserService');

class UserController {
  constructor() {
    this.create = this.create.bind(this);
    this.show = this.show.bind(this);
    this.find = this.find.bind(this);
    this.deleteSelf = this.deleteSelf.bind(this);
  }

  async create(request, response) {
    this.count += 1;
    const { displayName, image, password, email } = request.body;

    const userRepository = new UserRepository();
    const createUserService = new CreateUserService(userRepository);

    const userToCreate = { displayName, image, password, email };

    const { token } = await createUserService.execute(userToCreate);

    const CREATED = 201;

    return response.status(CREATED).json({ token });
  }

  async show(_request, response) {
    this.count += 1;

    const userRepository = new UserRepository();
    const listUsersService = new ListUsersService(userRepository);

    const users = await listUsersService.execute();

    const SUCCESS = 200;

    return response.status(SUCCESS).json(users);
  }

  async find(request, response) {
    this.count += 1;

    const { id } = request.params;

    const userRepository = new UserRepository();
    const findUserByIDService = new FindUserByIDService(userRepository);

    const user = await findUserByIDService.execute(id);

    const SUCCESS = 200;

    return response.status(SUCCESS).json(user);
  }

  async deleteSelf(request, response) {
    this.count += 1;

    const { id } = request.user;

    const userRepository = new UserRepository();
    const deleteSelfUserService = new DeleteSelfUserService(userRepository);

    await deleteSelfUserService.execute(id);

    const SUCCESS = 204;

    return response.status(SUCCESS).send();
  }
}

module.exports = UserController;
