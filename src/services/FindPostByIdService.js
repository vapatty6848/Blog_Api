const { NOT_FOUND } = require('http-status-codes').StatusCodes;
const AppError = require('../utils/AppError');

class FindPostByIdService {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }

  async execute(id) {
    this.count += 1;
    const post = await this.postsModel.findById(id);

    if (!post) throw new AppError('Post não existe', NOT_FOUND);

    return post;
  }
}

module.exports = FindPostByIdService;
