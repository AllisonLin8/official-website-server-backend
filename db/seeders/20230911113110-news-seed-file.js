'use strict'

// /** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker')

const { Category } = require('../models')
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
    const categories = await Category.findAll({
      attributes: ['id'],
      raw: true,
    })
    const data = new Array(10).fill(null).map(item => {
      item = {}
      const fakeDate = faker.date.anytime()
      const randomCategory = Math.floor(Math.random() * categories.length)
      item.title = faker.lorem.words(10)
      item.content = faker.lorem.paragraphs(6, '\n')
      item.category_id = categories[randomCategory].id
      item.cover = faker.image.urlPicsumPhotos()
      item.is_published = 0
      item.created_at = fakeDate
      item.updated_at = fakeDate
      return item
    })
    await queryInterface.bulkInsert('News', data, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('News', null, {})
  },
}
