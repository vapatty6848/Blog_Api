// const bcrypt = require('bcrypt');
// const { v4 } = require('uuid');
// const models = require('./');

// const uuidv4 = v4;

// const adjustsBeforeCreate = async (user) => {
//   try {
//     if (!user.id) {
//       const hashedPass = await bcrypt.hash(user.password, 9);
//       user.password = hashedPass;
//       user.id = uuidv4();
//     }
//   } catch (err) {
//     // errorHandler(err)
//     console.log(err);
//   }
// };

const Users = (sequelize, DataTypes) => {
  const UsersModel = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    hooks: {
      // beforeCreate: adjustsBeforeCreate,
    },
  });

  UsersModel.associate = (models) => {
    UsersModel.hasMany(models.BlogPosts,
      { foreignKey: 'id', as: 'user' });
  };

  return UsersModel;
};

module.exports = Users;
