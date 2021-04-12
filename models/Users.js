const createUsers = (sequelize, Datatypes) => {
  const Users = sequelize.define('Users', {
    displayName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  },
  { timestamps: false });

  return Users;
};

module.exports = createUsers;
