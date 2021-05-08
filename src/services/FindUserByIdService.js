const { NOT_FOUND } = require('http-status-codes').StatusCodes;
const AppError = require('../utils/AppError');

class FindUserByIdService {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  async execute(id) {
    this.count += 1;
    const user = await this.usersModel.findById(id);

    if (!user) throw new AppError('Usuário não existe', NOT_FOUND);

    const { dataValues: { password, ...userWithoutPassword } } = user;

    return userWithoutPassword;
  }
}

module.exports = FindUserByIdService;
