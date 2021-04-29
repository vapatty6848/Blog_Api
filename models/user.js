const User = (sequelize, DataTypes) => {
  const createUsers = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  createUsers.associate = (model) => {
    createUsers.hasOne(model.blogPost, { foreignKey: 'userId', as: 'blogPost' });
  };

  return createUsers;
};

module.exports = User;
