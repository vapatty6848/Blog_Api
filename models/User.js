const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      // entendi que id não precisa(testar depois)
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      displayName: { type: DataTypes.STRING },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: { type: DataTypes.STRING },
      image: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
    },
    { timestamps: false }, // CreatedAt e UpdateAt não serão utilizados
  );
  return User;
};

module.exports = createUser;
