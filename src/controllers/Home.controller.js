const { sequelize } = require("../../db")
const { arraySplit } = require("../helpers/arraySplit")
const { truncate } = require("../helpers/truncate")

const getHome = async (req, res) => {
  const query = `SELECT "Blogs".id, "title", "technologies", "content", "image", "author", "Users"."name", "duration"
    FROM "Blogs"
    LEFT JOIN "Users" ON "Users".id = "Blogs".author;`

  const [results] = await sequelize.query(query)
  let blogs = [...results]

  const techColors = {
    laravel: "#f55247",
    node: "#3c873a",
    golang: "#00add8",
    react: "#61dbfb",
  }

  blogs.forEach((blog) => {
    blog.content = truncate(blog.content, 50)
    blog.title = truncate(blog.title, 20)
    arraySplit(blog)
    blog.technologies = blog.technologies.map((technology) => {
      const color = techColors[technology] || "#000"
      return { technology, color }
    })
    if (blog.duration < 1) {
      blog.duration = "less than 1 month"
    } else {
      blog.duration = `${blog.duration} month`
    }
  })

  blogs = blogs.map((blog) => ({
    ...blog,
    canAccess: req.session.user?.id == blog.author,
  }))

  res.render("index", {
    layout: "index",
    active: { Home: true },
    blogs,
    isLogin: req.session.isLogin,
    user: req.session.user,
    success: req.flash("success"),
    info: req.flash("info"),
    danger: req.flash("danger"),
  })
}

module.exports = {
  getHome,
}
