class CreatePostService {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }

  async execute({ title, content, userId }) {
    this.count += 1;

    return this.postsModel.create({
      title, content, userId,
    });
  }
}

module.exports = CreatePostService;
