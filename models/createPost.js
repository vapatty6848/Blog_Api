const createPost = (sequelize, DataTypes) => {
  const Posts = sequelize.define('BlogPosts', {
    // id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
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
