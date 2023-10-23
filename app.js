const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")
const exphbs = require("express-handlebars")
const methodOverride = require("method-override")
const session = require("express-session")
const flash = require("connect-flash")
const PORT = 5000

// cors for consume api
app.use(cors())

// setup session express
app.use(
  session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 2,
    },
    saveUninitialized: true,
    resave: false,
    secret: "batchfifty",
  })
)

// setup to call hbs
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "src/views"))

// Use method-override middleware to override HTTP methods
app.use(methodOverride("_method"))

// parsing data from client
app.use(express.urlencoded({ extended: false }))

// setup for flash message
app.use(flash())

// access static file
app.use(express.static("./src/public"))
app.use(express.static("./src/uploads"))

// all routes
const HomeRoute = require("./src/routes/Home.routes")
const BlogRoute = require("./src/routes/Blog.routes")
const TestimonialRoute = require("./src/routes/Testimonial.routes")
const ContactRoute = require("./src/routes/Contact.routes")
const ApiRoute = require("./src/routes/Api.routes")
const UserRoute = require("./src/routes/User.routes")

// app router
app.use("/", HomeRoute)
app.use("/", UserRoute)
app.use("/blog", BlogRoute)
app.use("/testimonial", TestimonialRoute)
app.use("/contact", ContactRoute)
app.use("/api", ApiRoute)

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})
