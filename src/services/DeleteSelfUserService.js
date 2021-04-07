const AppError = require('../errors/AppError');
const { NOT_FOUND } = require('../errors/status');

const notFoundError = 'user not found';

class DeleteSelfUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    this.count += 1;

    const user = await this.userRepository.findByID(id);

    if (!user) throw new AppError(notFoundError, NOT_FOUND);

    await this.userRepository.deleteByID(id);
  }
}

module.exports = DeleteSelfUserService;
