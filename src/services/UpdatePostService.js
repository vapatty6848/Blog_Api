const { NOT_FOUND, UNAUTHORIZED } = require('http-status-codes').StatusCodes;
const AppError = require('../utils/AppError');

class UpdatePostService {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }

  async execute({ userId, postId, title, content }) {
    this.count += 1;
    const postFound = await this.postsModel.findById(postId);

    if (!postFound) throw new AppError('Post não existe', NOT_FOUND);

    const { dataValues: post } = postFound;

    if (String(userId) !== String(post.userId)) throw new AppError('Usuário não autorizado', UNAUTHORIZED);

    return this.postsModel.update({ ...post, title, content });
  }
}

module.exports = UpdatePostService;
