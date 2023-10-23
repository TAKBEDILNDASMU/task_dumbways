const bcrypt = require("bcrypt")
const { sequelize, QueryTypes } = require("../../db")

const register = async (req, res) => {
  res.render("register", { layout: "index", active: { Register: true } })
}

const store = async (req, res) => {
  const { name, email, password } = req.body
  let errors = []

  if (!name || !email || !password) {
    errors.push({ message: "All the fields must be filled to proceed" })
  }

  if (password.length < 5) {
    errors.push({ message: "Sorry the password must be at least 5 characters long" })
  }

  if (errors.length > 0) {
    console.log(errors)
    res.render("register", { errors, name, email, password, layout: "index" })
  } else {
    const [results] = await sequelize.query(
      `SELECT * FROM "Users" WHERE "email" = '${email}'`
    )

    if (results.length > 0) {
      errors.push({ message: "Email already in the database" })
      res.render("register", { layout: "index", errors, name, email, password })
    } else {
      bcrypt.hash(password, 10, (err, hashPassword) => {
        const query = `INSERT INTO "Users" (name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())`
        sequelize.query(query)
        res.render("login", {
          layout: "index",
          message: "Your email is registered, please log in",
        })
      })
    }
  }
}

const login = async (req, res) => {
  res.render("login", {
    layout: "index",
    active: { Login: true },
  })
}

const authenticate = async (req, res) => {
  const { email, password } = req.body
  const query = `SELECT * FROM "Users" WHERE email = '${email}'`

  let errors = []

  if (!email || !password) {
    errors.push({ message: "All the fields must be filled to proceed" })
  }

  if (password.length < 5) {
    errors.push({ message: "Sorry the password must be at least 5 characters long" })
  }

  if (errors.length > 0) {
    res.render("login", { layout: "index", errors, email })
    return
  }

  try {
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    if (!obj.length) {
      errors.push({ message: "Your email has not been registered" })
      res.render("login", { layout: "index", errors, email })
      return
    }

    const match = await bcrypt.compare(password, obj[0].password)
    if (!match) {
      req.flash("danger", "password wrong")
      errors.push({ message: "Your password is wrong" })
      return res.render("login", { layout: "index", errors, email })
    } else {
      req.session.isLogin = true
      req.session.user = obj[0]
      req.flash("success", "You are logged in")
      return res.redirect("/")
    }
  } catch (error) {
    console.error("Error authenticating user:", error)
    res.status(500).send("Internal Server Error")
  }
}

const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err)
        res.status(500).send("Internal Server Error")
      } else {
        res.render("login", {
          layout: "index",
          message: "You are successfully logged out",
        })
      }
    })
  } catch (error) {
    console.error("Error during logout:", error)
    res.status(500).send("Internal Server Error")
  }
}

module.exports = {
  register,
  store,
  login,
  authenticate,
  logout,
}
