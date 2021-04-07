class CreateUserService {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute({ title, content, userId }) {
    const postToCreate = { title, content, userId };

    const post = await this.postRepository.create(postToCreate);

    return post;
  }
}

module.exports = CreateUserService;
