const Post = (sequelize, DataTypes) => {
  const createPost = sequelize.define('Posts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  createPost.associate = (models) => {
    createPost.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
  };

  return createPost;
};

module.exports = Post;
