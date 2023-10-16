const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")
const exphbs = require("express-handlebars")
const PORT = 5000

// all routes
const homeRoute = require("./src/routes/Home.routes")
const BlogRoute = require("./src/routes/Blog.routes")
const TestimonialRoute = require("./src/routes/Testimonial.routes")
const ContactRoute = require("./src/routes/Contact.routes")
const ApiRoute = require("./src/routes/Api.routes")

const { engine } = require("express-handlebars")

// cors for consume api
app.use(cors())

// setup to call hbs
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "src/views"))

//Sets handlebars configurations
app.engine(".hbs", engine({ extname: ".hbs" }))

// parsing data from client
app.use(express.urlencoded({ extended: false }))

// access static file
app.use(express.static("./src/public"))

// app router
app.use("/", homeRoute)
app.use("/blog", BlogRoute)
app.use("/testimonial", TestimonialRoute)
app.use("/contact", ContactRoute)
app.use("/api", ApiRoute)

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})
