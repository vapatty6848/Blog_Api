const BlogPostsRepository = require('../database/repositories/BlogPostsRepository');

const CreatePostService = require('../services/CreatePostService');
const ListPostService = require('../services/ListPostService');
const FindPostByIDService = require('../services/FindPostByIDService');
const UpdatePostService = require('../services/UpdatePostService');
const SearchPostService = require('../services/SearchPostService');
const DeletePostService = require('../services/DeletePostService');

class UserController {
  constructor() {
    this.create = this.create.bind(this);
    this.show = this.show.bind(this);
    this.find = this.find.bind(this);
    this.search = this.search.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, response) {
    this.count += 1;
    const { title, content } = request.body;
    const { id: userId } = request.user;

    const blogPostsRepository = new BlogPostsRepository();
    const createPostService = new CreatePostService(blogPostsRepository);

    const postToCreate = { title, content, userId };

    const post = await createPostService.execute(postToCreate);

    const CREATED = 201;

    return response.status(CREATED).json(post);
  }

  async show(_request, response) {
    this.count += 1;

    const blogPostsRepository = new BlogPostsRepository();
    const listPostService = new ListPostService(blogPostsRepository);

    const users = await listPostService.execute();

    const SUCCESS = 200;

    return response.status(SUCCESS).json(users);
  }

  async find(request, response) {
    this.count += 1;

    const { id } = request.params;

    const blogPostsRepository = new BlogPostsRepository();
    const findPostByIDService = new FindPostByIDService(blogPostsRepository);

    const post = await findPostByIDService.execute(id);

    const SUCCESS = 200;

    return response.status(SUCCESS).json(post);
  }

  async update(request, response) {
    this.count += 1;

    const { id: postId } = request.params;
    const { id: userId } = request.user;
    const { title, content } = request.body;

    const blogPostsRepository = new BlogPostsRepository();
    const updatePostService = new UpdatePostService(blogPostsRepository);

    const updated = await updatePostService.execute({ userId, postId, title, content });

    const SUCCESS = 200;

    return response.status(SUCCESS).json(updated);
  }

  async search(request, response) {
    this.count += 1;

    const { q: searchTerm } = request.query;

    const blogPostsRepository = new BlogPostsRepository();
    const searchPostTitleService = new SearchPostService(blogPostsRepository);

    const posts = await searchPostTitleService.execute(searchTerm);

    const SUCCESS = 200;

    return response.status(SUCCESS).json(posts);
  }

  async delete(request, response) {
    this.count += 1;

    const { id: postId } = request.params;
    const { id: userId } = request.user;

    const blogPostsRepository = new BlogPostsRepository();
    const deletePostService = new DeletePostService(blogPostsRepository);

    await deletePostService.execute({ userId, postId });

    const DELETED = 204;

    return response.status(DELETED).send();
  }
}

module.exports = UserController;
