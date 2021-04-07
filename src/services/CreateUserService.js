const AppError = require('../errors/AppError');
const { CONFLICT } = require('../errors/status');

const generateJWT = require('../utils/generateJWT');

const emailError = 'Usuário já existe';

class CreateUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, displayName, password, image }) {
    const userWithEmail = await this.userRepository.findByEmail(email);

    if (userWithEmail) throw new AppError(emailError, CONFLICT);

    // const hashedPassword = await this.HashProvider.generateHash(password);

    const userToCreate = { email, displayName, password, image };

    const User = await this.userRepository.create(userToCreate);

    const { password: _, ...user } = User.dataValues;

    const token = generateJWT(user);

    return { user, token };
  }
}

module.exports = CreateUserService;
