const UserRepository = require('../database/repositories/UserRepository');

// const HashProvider = require('../providers/hashProvider');

const CreateSessionService = require('../services/CreateSessionService');

class SessionController {
  constructor() {
    this.create = this.create.bind(this);
  }

  async create(request, response) {
    this.count += 1;
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    // const hashProvider = new HashProvider();
    const createSessionService = new CreateSessionService(userRepository);

    const sessionInfo = { email, password };

    const token = await createSessionService.execute(sessionInfo);

    const CREATED = 200;

    return response.status(CREATED).json({ token });
  }
}

module.exports = SessionController;
