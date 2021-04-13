const BlogPost = (sequelize, DataTypes) => {
  const blogpost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  { timestamps: false });

  blogpost.associate = (models) => {
    blogpost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return blogpost;
};

module.exports = BlogPost;
