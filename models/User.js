const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: { type: DataTypes.STRING },
    image: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  },
  { timestamps: false }); // CreatedAt e UpdateAt não serão utilizados
  User.associate = (models) => {
    User.hasMany(models.BlogPosts, { foreignKey: 'userId', as: 'BlogPosts' });
  };
  return User;
};

module.exports = createUser;
