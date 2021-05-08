const AppError = require('../utils/AppError');
const generateToken = require('../utils/generateToken');

class CreateSessionService {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  async execute({ email, password }) {
    this.count += 1;
    const user = await this.usersModel.findByEmail(email);

    if (!user || password !== user.password) throw new AppError('Campos inválidos');

    return generateToken({ email, id: user.id });
  }
}

module.exports = CreateSessionService;
