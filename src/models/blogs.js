"use strict"
const { Model, Sequelize } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Blogs.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      technologies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      author: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Blogs",
      createdAt: false,
      updatedAt: false,
    }
  )
  return Blogs
}
