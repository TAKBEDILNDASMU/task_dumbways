const express = require("express")
const router = express.Router()
const moment = require("moment")

// mocks data
let blogs = require("../mocks/blogs.json")

router.get("/", (req, res) => {
  blogs.forEach((blog) => console.log(blog))
  res.render("blog", { layout: "index", active: { Blog: true }, blogs })
})

router.get("/create", (req, res) => {
  res.render("add-blog", { layout: "index", active: { Blog: true } })
})

router.post("/create", (req, res) => {
  const { title, content, image, technologies } = req.body

  const techs = []

  technologies.forEach((tech) => {
    const parts = tech.split("|")
    const obj = {
      technology: parts[0],
      color: parts[1],
    }
    techs.push(obj)
  })

  blogs.unshift({
    id: blogs.length + 1,
    title,
    content,
    technologies: techs,
    postedAt: moment().format("Do MMM YYYY"),
    author: "Patrick",
  })

  res.redirect("/blog")
})

router.get("/:id", (req, res) => {
  res.render("blog-detail", { layout: "index", active: { Blog: true }, blogs })
})

router.get("/delete/:id", (req, res) => {
  const { id } = req.params
  console.log(id)

  blogs = blogs.filter((blog) => blog.id != id)

  res.redirect("/blog")
})

router.get("/edit/:id", (req, res) => {
  const { id } = req.params
  const blog = blogs.filter((blog) => blog.id == id)[0]

  const techData = [
    { technology: "react", color: "#61dbfb" },
    { technology: "laravel", color: "#f55247" },
    { technology: "golang", color: "#f55247" },
    { technology: "node", color: "#f55247" },
  ]

  const techs = blog.technologies.map((tech) => tech)
  console.log(techs)

  res.render("edit-blog", { layout: "index", active: { Blog: true }, blog, techData })
})

router.post("/edit/:id", (req, res) => {
  const { id } = req.params
  const { title, content, image } = req.body
  blogs[id] = {
    id: id,
    title,
    content,
    postedAt: moment().format("Do MMM YY"),
    author: "Patrick",
  }

  res.redirect("/blog")
})

module.exports = router
