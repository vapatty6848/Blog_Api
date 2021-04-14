const createBlogPost = (sequelize, Datatypes) => {
  const BlogPost = sequelize.define('BlogPosts', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    userId: {
      type: Datatypes.INTEGER, foreignKey: true,
    },
    published: Datatypes.DATE,
    updated: Datatypes.DATE,
  }, { timestamps: false });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
    });
  };
  return BlogPost;
};

module.exports = createBlogPost;
