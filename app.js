const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")
const PORT = 5000

const routes = require("./src/routes/App.routes")
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
app.use("/", routes)

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})
