const { NOT_FOUND, UNAUTHORIZED } = require('http-status-codes').StatusCodes;
const AppError = require('../utils/AppError');

class SelfDeleteUserService {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }

  async execute({ postId, userId }) {
    this.count += 1;
    const postToDelete = await this.postsModel.findById(postId);

    if (!postToDelete) throw new AppError('Post não existe', NOT_FOUND);

    const { dataValues: post } = postToDelete;

    if (String(userId) !== String(post.userId)) throw new AppError('Usuário não autorizado', UNAUTHORIZED);

    await this.postsModel.deleteById(postId);
  }
}

module.exports = SelfDeleteUserService;
