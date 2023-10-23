'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Users'
          }
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Products'
          }
        }
      },
      orderId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Orders'
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
    await queryInterface.dropTable('Items');
  }
};