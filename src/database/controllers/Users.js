const Crud = require('./Crud');
const { User } = require('../models');

class Users extends Crud {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    this.count += 1;
    return User.findOne({ where: { email } });
  }
}

module.exports = Users;
