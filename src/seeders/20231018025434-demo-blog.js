"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `INSERT INTO public."Blogs" (title, content, image, author, duration, "startDate", "endDate" , "createdAt", "updatedAt" , technologies)
        VALUES ('Laravel Blog', 'Laravel Blog with admin panel', 'image.png', 1, "2023-10-03T00:00:00.000Z", NOW() , NOW(), NOW() , ARRAY ['laravel','node'] );`
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Blogs", null, {})
  },
}
