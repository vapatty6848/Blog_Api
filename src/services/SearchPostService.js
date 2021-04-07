class SearchPostService {
  constructor(blogPostsRepository) {
    this.blogPostsRepository = blogPostsRepository;
  }

  async execute(searchTerm) {
    const posts = await this.blogPostsRepository.searchByTerm(searchTerm);

    return posts;
  }
}

module.exports = SearchPostService;
