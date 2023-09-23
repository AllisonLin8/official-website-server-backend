'use strict'
const { Op } = require('sequelize')
const { faker } = require('@faker-js/faker')

const { User, Category } = require('../models')

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
    const categoriesPromise = Category.findAll({
      attributes: ['id'],
      raw: true,
    })
    const usersPromise = User.findAll({
      attributes: ['id'],
      where: { name: { [Op.not]: 'root' } },
      raw: true,
    })
    const [categories, users] = await Promise.all([
      categoriesPromise,
      usersPromise,
    ])

    const data = new Array(30).fill(null).map(item => {
      item = {}
      const fakeDate = faker.date.past({ years: 2 })
      const randomUser = Math.floor(Math.random() * users.length)
      const randomCategory = Math.floor(Math.random() * categories.length)
      item.title = faker.lorem.words(10)
      item.content = faker.lorem.paragraphs(6, '\n')
      item.category_id = categories[randomCategory].id
      item.user_id = users[randomUser].id
      item.cover = faker.image.urlPicsumPhotos()
      item.is_published = true
      item.view_count = Math.floor(Math.random() * 1000)
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
