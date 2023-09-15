'use strict'
const bcrypt = require('bcrypt')
const { faker } = require('@faker-js/faker')

const { Role } = require('../models')

// /** @type {import('sequelize-cli').Migration} */
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
      raw: true,
      attributes: ['id', 'name'],
    })
    const fakeDate = faker.date.past({
      years: 1,
      refDate: '2020-01-01T00:00:00.000Z',
    })
    const data = roles.map(item => {
      return {
        name: item.name,
        email: item.name + '@example.com',
        password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10)),
        intro: faker.lorem.sentence({ min: 3, max: 5 }),
        avatar: faker.image.avatar(),
        role_id: item.id,
        created_at: fakeDate,
        updated_at: fakeDate,
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
