"use strict";
require('dotenv').config();
const {hashSync} = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "admin",
          surname : "mercadoLiebre",
          email : "admin@gmail.com",
          password : hashSync(process.env.ADMIN_PASSWORD,10),
          avatar : null,
          disabled : false,
          rolId : 1,
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          name: "user",
          surname : "mercadoLiebre",
          email : "user@gmail.com",
          password : hashSync('123123',10),
          avatar : null,
          disabled : false,
          rolId : 2,
          createdAt: new Date,
          updatedAt: new Date,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
