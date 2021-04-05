const createUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
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

module.exports = createUsers;
