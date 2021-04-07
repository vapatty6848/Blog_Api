class ListUsersService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    const users = await this.userRepository.list();

    const usersWithNotPassword = users.map(({ dataValues }) => {
      const { password, ...user } = dataValues;

      return user;
    });

    return usersWithNotPassword;
  }
}

module.exports = ListUsersService;
