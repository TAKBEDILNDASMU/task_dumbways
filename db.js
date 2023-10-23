const { Sequelize, QueryTypes, DataTypes } = require("sequelize")
const config = require("./src/config/config.json")
const sequelize = new Sequelize(config.development)

module.exports = {
  sequelize,
  QueryTypes,
  DataTypes,
}
