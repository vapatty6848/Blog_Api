const User = (sequelize, DataTypes) => {
  const defineUser = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
    { timestamps: false });

  defineUser.associate = (model) => {
    defineUser.hasMany(model.BlogPosts, {
      foreignKey: 'userId',
      as: 'posts',
    });
  };

  return defineUser;
};

module.exports = User;
