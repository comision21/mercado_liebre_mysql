'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull : false
      },
      surname: {
        type: Sequelize.STRING,
        allowNull : false
      },
      email: {
        type: Sequelize.STRING,
        allowNull : false,
        unique: true
      },
      birthday : {
        type : Sequelize.DATE,
      },
      
      password: {
        type: Sequelize.STRING,
        allowNull : false
      },
      avatar: {
        type: Sequelize.STRING
      },
      disabled : {
        type: Sequelize.BOOLEAN
      },
      rolId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Rols'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};