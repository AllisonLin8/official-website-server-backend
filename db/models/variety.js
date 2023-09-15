'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Variety extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Variety.hasMany(models.Product, { foreignKey: 'varietyId' })
    }
  }
  Variety.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Variety',
      underscored: true,
      tableName: 'Varieties',
    }
  )
  return Variety
}
