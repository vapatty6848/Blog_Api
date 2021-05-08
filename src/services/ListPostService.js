class ListPostService {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }

  async execute() {
    this.count += 1;

    return this.postsModel.list();
  }
}

module.exports = ListPostService;
