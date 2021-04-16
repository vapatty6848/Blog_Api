const User = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, { timestamps: false });

  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts, { foreignkey: 'userId', as: 'posts' });
  };

  return Users;
};

module.exports = User;
