const AppError = require('../errors/AppError');
const { NOT_FOUND } = require('../errors/status');

class FindUserByIDService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const userInfo = await this.userRepository.findByID(id);

    if (!userInfo) {
      const message = 'Usuário não existe';

      throw new AppError(message, NOT_FOUND);
    }

    return userInfo;
  }
}

module.exports = FindUserByIDService;
