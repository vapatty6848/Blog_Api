const bcrypt = require('bcryptjs');

class BCryptHashProvider {
  async generateHash(payload) {
    this.count += 1;

    return bcrypt.hash(payload, 8);
  }

  async compareHash(payload, hashed) {
    this.count += 1;

    return bcrypt.compare(payload, hashed);
  }
}

module.exports = BCryptHashProvider;
