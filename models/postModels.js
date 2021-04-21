const Post = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  blogPost.associate = (model) => {
    blogPost.belongsTo(model.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return blogPost;
};

module.exports = Post;
