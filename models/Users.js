const User = (sequelize, DataTypes) => {
  const createUser = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  // createUser.associate = (models) => {
  //   createUser.hasMany(models.Post, {
  //     foreignKey: 'userId', as: 'Post',
  //   });
  // };

  return createUser;
};

module.exports = User;
