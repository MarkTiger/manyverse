'use strict';
const { hashPassword } = require("../helpers/hashPassword")
module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = require("./users.json")
      .map(user => {
        user.password = hashPassword(user.password)
        user.createdAt = new Date()
        user.updatedAt = new Date()
        return user
      })
    return queryInterface.bulkInsert("Users", data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {})
  }
};
