const CreateLoginService = require('../services/CreateLoginService');

const { BAD_REQUEST } = require('../errors/status');

const OK = 200;

module.exports = {
  async createLogin(req, res) {
    const token = await CreateLoginService.execute(req.body);

    if (token) {
      return res.status(OK).json({ token });
    }

    return res.status(BAD_REQUEST).json({ message: 'Campos inválidos' });
  },
};
