const Crud = require('./Crud');
const { BlogPost, User } = require('../models');

class BlogPosts extends Crud {
  constructor() {
    super(BlogPost);
  }

  async findByEmail(email) {
    this.count += 1;
    return BlogPost.findOne({ where: { email } });
  }

  async list() {
    this.count += 1;
    return BlogPost.findAll({
      include: { as: 'user', model: User, attributes: ['id', 'displayName', 'email', 'image'] },
    });
  }

  async findById(id) {
    this.count += 1;
    return BlogPost.findByPk(id, {
      include: { as: 'user', model: User, attributes: ['id', 'displayName', 'email', 'image'] },
    });
  }

  async update(post) {
    await super.update(post);
    return this.findById(post.id);
  }
}

module.exports = BlogPosts;
