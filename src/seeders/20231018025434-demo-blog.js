"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `INSERT INTO public."Blogs" (title, content, image, author, "createdAt", "updatedAt" , technologies)
        VALUES ('Laravel Blog', 'Laravel Blog with admin panel', 'image.png', 'patrick', NOW(), NOW() , ARRAY ['laravel','node'] );`
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Blogs", null, {})
  },
}
