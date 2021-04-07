const createPost = (sequelize, DataTypes) => {
  const Post = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: { type: DataTypes.DATE, defaultValue: new Date() },
    updated: { type: DataTypes.DATE, defaultValue: new Date() },
  },
  {
    timestamps: false, // CreatedAt e UpdateAt não serão utilizados
  });

  return Post;
};

module.exports = createPost;
