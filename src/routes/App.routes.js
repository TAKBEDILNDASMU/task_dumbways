const express = require("express")
const router = express.Router()
const moment = require("moment")
const cors = require("cors")

// mocks data
let blogs = require("../mocks/blogs.json")
let testimonials = require("../mocks/testimonials.json")

router.get("/", (req, res) => {
  res.render("index", { layout: "index", active: { Home: true } })
})

router.get("/blog/create", (req, res) => {
  res.render("add-blog", { layout: "index", active: { Blog: true } })
})

router.post("/blog/create", (req, res) => {
  const { title, content, image } = req.body
  blogs.unshift({
    id: blogs.length + 1,
    title,
    content,
    postedAt: moment().format("Do MMM YYYY"),
    author: "Patrick",
  })

  console.log(blogs)
  res.redirect("/blog")
})

router.get("/blog/delete/:id", (req, res) => {
  const { id } = req.params
  console.log(id)

  blogs = blogs.filter((blog) => blog.id != id)

  res.redirect("/blog")
})

router.get("/blog/edit/:id", (req, res) => {
  const { id } = req.params
  const blog = blogs.filter((blog) => blog.id == id)[0]

  res.render("edit-blog", { layout: "index", active: { Blog: true }, blog })
})

router.post("/blog/edit/:id", (req, res) => {
  const { id } = req.params
  const { title, content, image } = req.body
  blogs[id] = {
    id: id,
    title,
    content,
    postedAt: moment().format("Do MMM YY"),
    author: "Patrick",
  }

  console.log(blogs)
  res.redirect("/blog")
})

router.get("/blog", (req, res) => {
  res.render("blog", { layout: "index", active: { Blog: true }, blogs })
})

router.get("/testimonial", (req, res) => {
  res.render("testimonial", {
    layout: "index",
    active: { Testimonial: true },
  })
})

router.get("/api/testimonial", cors(), (req, res) => {
  res.json(testimonials)
})

router.get("/contact", (req, res) => {
  res.render("contact", { layout: "index" })
})

module.exports = router
