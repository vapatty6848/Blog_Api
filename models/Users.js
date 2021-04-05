const createUser = (sequelize, Datatypes) => {
  const User = sequelize.define('Users', {
    displayName: Datatypes.INTEGER,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  });
  return User;
};

module.exports = createUser;
