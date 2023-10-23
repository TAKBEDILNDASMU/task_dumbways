const { sequelize, DataTypes } = require("../../db")

const Test = sequelize.define("test", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },

  fullName: {
    type: DataTypes.STRING,
  },

  age: {
    type: DataTypes.INTEGER,
  },

  employed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})

module.exports = Test
