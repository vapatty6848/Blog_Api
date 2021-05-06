const createUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  // Users.associate = (models) => {
  //  Users.hasOne(models.BlogPosts,
  //    { foreignKey: 'userId', as: 'user' });
  // };

  return Users;
};

module.exports = createUsers;
