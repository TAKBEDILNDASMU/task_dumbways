"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Blogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      technologies: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Blogs")
  },
}
