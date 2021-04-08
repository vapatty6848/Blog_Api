module.exports = (Sequelize, DataTypes) => {
  const Users = Sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts,
      { foreignKey: 'userId', as: 'blogposts' });
  };

  return Users;
};
