const generateJWT = require('../utils/generateJWT');

const AppError = require('../errors/AppError');

const invalidFields = 'Campos inválidos';

class CreateSessionService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError(invalidFields);

    if (user.password !== password) throw new AppError(invalidFields);

    const { password: _, ...userInfo } = user.dataValues;

    const token = generateJWT(userInfo);

    return token;
  }
}

module.exports = CreateSessionService;
