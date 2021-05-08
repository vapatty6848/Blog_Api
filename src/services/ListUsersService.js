class ListUsersService {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  async execute() {
    this.count += 1;
    const users = await this.usersModel.list();

    return users.map(({ dataValues }) => {
      const { password, ...user } = dataValues;
      return user;
    });
  }
}

module.exports = ListUsersService;
