'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Variety, { foreignKey: 'varietyId' })
    }
  }
  Product.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      subtitle: DataTypes.STRING,
      cover: DataTypes.STRING,
      desc: DataTypes.TEXT,
      varietyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
      underscored: true,
      tableName: 'Products',
    }
  )
  return Product
}
