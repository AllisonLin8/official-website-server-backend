'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.User, { foreignKey: 'userId' })
      News.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  }
  News.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      cover: DataTypes.STRING,
      isPublished: DataTypes.BOOLEAN,
      viewCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'News',
      underscored: true,
      tableName: 'News',
    }
  )
  return News
}
