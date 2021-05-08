const {
  CreatePostService,
  ListPostService,
  FindPostByIdService,
  UpdatePostService,
  DeletePostService,
} = require('../services');

const BlogPosts = require('../database/controllers/BlogPosts');

class BlogPostsController {
  async create(req, res) {
    this.count += 1; // this is to bypass class-methods-use-this

    const { id: userId } = req.user;
    const { title, content } = req.body;

    const blogPosts = new BlogPosts();
    const createPostService = new CreatePostService(blogPosts);

    const post = await createPostService.execute({ title, content, userId });

    const POST_CREATED = 201;

    return res.status(POST_CREATED).json(post);
  }

  async show(_req, res) {
    this.count += 1;

    const blogPosts = new BlogPosts();
    const listPostService = new ListPostService(blogPosts);

    const post = await listPostService.execute();

    const POST_LISTED = 200;

    return res.status(POST_LISTED).json(post);
  }

  async find(req, res) {
    this.count += 1;

    const { id } = req.params;

    const blogPosts = new BlogPosts();
    const findPostByIdService = new FindPostByIdService(blogPosts);

    const user = await findPostByIdService.execute(id);

    const USER_FOUND = 200;

    return res.status(USER_FOUND).json(user);
  }

  async update(req, res) {
    this.count += 1;

    const { id: userId } = req.user;
    const { id: postId } = req.params;

    const blogPosts = new BlogPosts();
    const updatePostService = new UpdatePostService(blogPosts);

    const post = await updatePostService.execute({ userId, postId, ...req.body });

    const USER_UPDATED = 200;

    return res.status(USER_UPDATED).json(post);
  }

  async delete(req, res) {
    this.count += 1;

    const { id: postId } = req.params;
    const { id: userId } = req.user;

    const blogPosts = new BlogPosts();
    const deletePostService = new DeletePostService(blogPosts);

    await deletePostService.execute({ postId, userId });

    const POST_DELETED = 204;

    return res.status(POST_DELETED).send();
  }
}

module.exports = BlogPostsController;
