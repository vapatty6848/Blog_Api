// addHooks Executa o comando antes do comando global
const addHooks = (blogposts) => {
  blogposts.addHook('beforeCreate', (blogPostParam) => {
    const blogPost = blogPostParam;
    blogPost.published = new Date();
    blogPost.updated = new Date();
    return blogPost;
  });

  blogposts.addHook('beforeUpdate', (blogPostParam) => {
    const blogPost = blogPostParam;
    blogPost.updated = new Date();
    return blogPost;
  });

  return blogposts;
};

const BlogPosts = (sequelize, DataTypes) => {
  const blogposts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  blogposts.associate = (model) => {
    blogposts.belongsTo(model.User, { foreignKey: 'userId', as: 'user' });
  };
  // belongsTo - Crie uma nova instância do modelo associado e associe-a a este.

  return addHooks(blogposts);
};

module.exports = BlogPosts;
