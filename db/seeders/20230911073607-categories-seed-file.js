'use strict'
const { faker } = require('@faker-js/faker')

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
    const fakeDate = faker.date.past({
      years: 1,
      refDate: '2020-01-01T00:00:00.000Z',
    })
    await queryInterface.bulkInsert(
      'Categories',
      ['最新動態', '案例分享', '通知公告'].map(item => {
        return {
          name: item,
          created_at: fakeDate,
          updated_at: fakeDate,
        }
      }),
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {})
  },
}
