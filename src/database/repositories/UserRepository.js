const { User } = require('../models');

class UserRepository {
  async list() {
    this.count += 1;

    const users = await User.findAll();

    return users;
  }

  async findByID(id) {
    this.count += 1;

    const user = await User.findByPk(id);

    return user;
  }

  async findByEmail(email) {
    this.count += 1;

    const user = await User.findOne({
      where: { email },
    });

    return user;
  }

  async create({ email, displayName, password, image }) {
    this.count += 1;

    const userToCreate = { email, displayName, password, image };

    const newUser = await User.create(userToCreate);

    return newUser;
  }

  // async update({ id, title, author, pageQuantity }) {
  //   const bookToUpdate = {
  //     title,
  //     pageQuantity,
  //     author,
  //   };

  //   await Book.update(bookToUpdate, {
  //     where: {
  //       id,
  //     },
  //   });
  // }

  async deleteByID(id) {
    this.count += 1;

    await User.destroy({ where: { id }, cascade: true });
  }
}

module.exports = UserRepository;
