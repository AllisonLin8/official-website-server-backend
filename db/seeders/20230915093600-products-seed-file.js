'use strict'
const { faker } = require('@faker-js/faker')

const { Variety } = require('../models')

/** @type {import('sequelize-cli').Migration} */
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
    const varieties = await Variety.findAll({
      attributes: ['id'],
      raw: true,
    })

    const data = new Array(20).fill(null).map(item => {
      item = {}
      const fakeDate = faker.date.past({ years: 2 })
      const randomVariety = Math.floor(Math.random() * varieties.length)
      item.title = faker.lorem.words(10)
      item.subtitle = faker.lorem.words(20)
      item.variety_id = varieties[randomVariety].id
      item.desc = faker.lorem.paragraphs(6, '\n')
      item.cover = faker.image.urlPicsumPhotos()
      item.created_at = fakeDate
      item.updated_at = fakeDate
      return item
    })
    await queryInterface.bulkInsert('Products', data, {})
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {})
  },
}
