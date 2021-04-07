module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    'User', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER(1),
      },
      displayName: { type: DataType.STRING },
      email: { type: DataType.STRING },
      password: { type: DataType.STRING },
      image: { type: DataType.STRING },
    },
    { timestamps: false },
  );

  User.associate = (models) => {
    User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'user id' });
  };

  return User;
};
