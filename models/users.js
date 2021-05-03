const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      as: 'user',
      foreignKey: 'userId', 
    });
  };

  return User;
};

module.exports = createUser;
