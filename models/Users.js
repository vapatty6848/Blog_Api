const Users = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  users.associate = (model) => {
    users.hasOne(model.BlogPosts, { foreignKey: 'userId', as: 'blogPosts' });
  };

  return users;
};

module.exports = Users;
