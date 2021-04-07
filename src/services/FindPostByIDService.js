const AppError = require('../errors/AppError');
const { NOT_FOUND } = require('../errors/status');

class FindUserByIDService {
  constructor(blogPostsRepository) {
    this.blogPostsRepository = blogPostsRepository;
  }

  async execute(id) {
    const blogPost = await this.blogPostsRepository.findByID(id);

    if (!blogPost) {
      const message = 'Post não existe';

      throw new AppError(message, NOT_FOUND);
    }

    return blogPost;
  }
}

module.exports = FindUserByIDService;
