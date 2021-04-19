const User = (sequelize, DataTypes) => {
  const createUser = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  createUser.associate = (models) => {
    createUser.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'blogPosts',
    });
  };

  return createUser;
};

module.exports = User;
