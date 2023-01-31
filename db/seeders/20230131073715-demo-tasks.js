'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Tasks', [{
      id: uuidv4(),
      name: 'Buy Milk',
      isComplete: false,
      createdAt: new Date(),
      updatedAt: new Date()
     },
    {
      id: uuidv4(),
      name: 'Go for a walk',
      isComplete: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
