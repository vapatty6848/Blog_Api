const { Op } = require('sequelize');

const { BlogPost, User } = require('../models');

class BlogPostsRepository {
  async list() {
    this.count += 1;

    const posts = await BlogPost.findAll({
      include: { as: 'user', model: User, attributes: ['id', 'displayName', 'email', 'image'] },

    });

    return posts;
  }

  async findByID(id) {
    this.count += 1;

    const post = await BlogPost.findByPk(id, {
      include: { as: 'user', model: User, attributes: ['id', 'displayName', 'email', 'image'] },
    });

    return post;
  }

  async searchByTerm(searchTerm) {
    this.count += 1;

    const post = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${searchTerm}%` } },
          { content: { [Op.like]: `%${searchTerm}%` } },
        ],
      },
    }, {
      include: { as: 'user', model: User, attributes: ['id', 'displayName', 'email', 'image'] },
    });

    return post;
  }

  async create({ title, content, userId }) {
    this.count += 1;

    const postToCreate = { title, content, userId };

    const newPost = await BlogPost.create(postToCreate);

    return newPost;
  }

  async update({ id, ...post }) {
    this.count += 1;

    await BlogPost.update(post, {
      where: {
        id,
      },
    });

    const updated = await this.findByID(id);

    return updated;
  }

  async deleteByID(id) {
    this.count += 1;

    await BlogPost.destroy({ where: { id } });
  }
}

module.exports = BlogPostsRepository;
