const { NOT_FOUND } = require('http-status-codes').StatusCodes;
const AppError = require('../utils/AppError');

class SelfDeleteUserService {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  async execute(id) {
    this.count += 1;
    const user = await this.usersModel.findById(id);

    if (!user) throw new AppError('Usuário não existe', NOT_FOUND);

    await this.usersModel.deleteById(id);
  }
}

module.exports = SelfDeleteUserService;
