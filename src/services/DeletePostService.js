const AppError = require('../errors/AppError');
const { UNAUTHORIZED, NOT_FOUND } = require('../errors/status');

const notAuthorized = 'Usuário não autorizado';
const notFound = 'Post not found';

class DeletePostService {
  constructor(blogPostsRepository) {
    this.blogPostsRepository = blogPostsRepository;
  }

  async execute({ userId, postId }) {
    this.count += 1;

    const postExists = await this.blogPostsRepository.findByID(postId);

    if (!postExists) throw new AppError(notFound, NOT_FOUND);

    const { dataValues: post } = postExists;

    const postIsFromUser = String(userId) === String(post.userId);

    if (!postIsFromUser) throw new AppError(notAuthorized, UNAUTHORIZED);

    await this.blogPostsRepository.deleteByID(postId);
  }
}

module.exports = DeletePostService;
