const createUser = (sequelize, Datatypes) => {
  const User = sequelize.define('User', {
    displayName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  }, { timestamps: false });
  return User;
};

module.exports = createUser;
