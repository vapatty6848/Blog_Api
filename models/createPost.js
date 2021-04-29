const createPost = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Posts.associate = (models) => {
    Posts.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Posts;
};

module.exports = createPost;
