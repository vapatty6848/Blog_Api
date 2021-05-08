const { CONFLICT } = require('http-status-codes').StatusCodes;
const AppError = require('../utils/AppError');
const generateToken = require('../utils/generateToken');

class CreateUserService {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  async execute({ email, displayName, password, image }) {
    this.count += 1;
    const userAlreadyExists = await this.usersModel.findByEmail(email);

    if (userAlreadyExists) {
      const errorMessage = 'Usuário já existe';

      throw new AppError(errorMessage, CONFLICT);
    }

    const { dataValues: { id } } = await this.usersModel.create({
      email, displayName, password, image,
    });

    return generateToken({ email, id });
  }
}

module.exports = CreateUserService;
