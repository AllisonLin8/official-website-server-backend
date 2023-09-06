'use strict'

// /** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt')
const { faker } = require('@faker-js/faker')

const { Role } = require('../models')
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const roles = await Role.findAll({
      attributes: ['id', 'name'],
      raw: true,
    })
    const data = roles.map(item => {
      return {
        name: item.name,
        email: item.name + '@example.com',
        password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10)),
        intro: faker.lorem.sentence({ min: 3, max: 200 }),
        avatar: faker.image.avatar(),
        role_id: item.id,
        created_at: new Date(),
        updated_at: new Date(),
      }
    })
    await queryInterface.bulkInsert('Users', data, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  },
}
