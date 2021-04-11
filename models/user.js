const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost,
      { foreignKey: 'id', as: 'user' });
  };

  return user;
};

module.exports = User;
