'use strict';
// para validações : 
// [https://sequelize.org/master/manual/validations-and-constraints.html]
module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.createTable('Users', {
     id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
     },
     displayName: {
       type: Sequelize.STRING,
       allowNull: false, 
       validate: {
         min: 8
       }
     },
     email: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
         isEmail: true
       }
     },
     password: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
         min: 6,
         max: 6
       }
     },
     image: {
      type: Sequelize.STRING,
      allowNull: false,
    }
   })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
