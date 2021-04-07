const AppError = require('../errors/AppError');
const { UNAUTHORIZED, NOT_FOUND } = require('../errors/status');

const notAuthorized = 'Usuário não autorizado';
const notFound = 'Post not found';

class UpdatePostService {
  constructor(blogPostsRepository) {
    this.blogPostsRepository = blogPostsRepository;
  }

  async execute({ userId, postId, title, content }) {
    this.count += 1;

    const postExists = await this.blogPostsRepository.findByID(postId);

    if (!postExists) throw new AppError(notFound, NOT_FOUND);

    const { dataValues: post } = postExists;

    const postIsFromUser = String(userId) === String(post.userId);

    if (!postIsFromUser) throw new AppError(notAuthorized, UNAUTHORIZED);

    const toUpdatePost = {
      ...post,
      title,
      content,
    };

    const updated = await this.blogPostsRepository.update(toUpdatePost);

    return updated;
  }
}

module.exports = UpdatePostService;
