module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
  };

  return BlogPosts;
};

/* tive um pequeno problema por falta de atenção na hora de criar os models e usei os PRs de
Lucas Gomide: https://github.com/tryber/sd-06-project-blogs-api/pull/53/files
e Luciano Scalfone: https://github.com/tryber/sd-06-project-blogs-api/pull/9/files
para achar o que tava de errado e no fim era o tipo do dado das datas que estavam errados.
 */
