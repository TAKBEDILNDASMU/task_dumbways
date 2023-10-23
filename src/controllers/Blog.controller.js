const { sequelize } = require("../../db")
const { arraySplit } = require("../helpers/arraySplit")
const { differenceInMonths } = require("date-fns")
const fs = require("fs")

const getCreateBlog = (req, res) => {
  res.render("add-blog", {
    layout: "index",
    active: { Blog: true },
    isLogin: req.session.isLogin,
    user: req.session.user,
  })
}

const postCreateBlog = async (req, res) => {
  const { title, content } = req.body
  let { startDate, endDate } = req.body

  startDate = new Date(startDate)
  endDate = new Date(endDate)

  const duration = differenceInMonths(endDate, startDate)

  const image = req.file?.filename
    ? `/${req.file?.filename}`
    : "https://dummyimage.com/600x400/fe4e3/fff"
  let { technologies } = req.body
  const author = req.session.user.id

  if (typeof technologies != "object") {
    technologies = [technologies]
  }

  const query1 = `INSERT INTO public."Blogs"(
    title, 
    technologies, 
    content, 
    image, 
    author, 
    duration,
    "createdAt", 
    "updatedAt")
VALUES ('${title}', ARRAY ['${technologies}'], '${content}', '${image}', '${author}', '${duration}' ,NOW(), NOW());`

  await sequelize.query(query1)
  req.flash("success", "Project successfully added")

  res.redirect("/")
}

const getEditBlog = async (req, res) => {
  const { id } = req.params

  const techData = [
    { technology: "react", checked: false },
    { technology: "laravel", checked: false },
    { technology: "golang", checked: false },
    { technology: "node", checked: false },
  ]

  const [results] = await sequelize.query(`SELECT * FROM "Blogs" WHERE id = ${id}`)

  results.forEach((result) => {
    arraySplit(result)
  })

  const technologies = results[0].technologies

  techData.forEach((tech) => {
    const found = technologies.some((existingTech) => existingTech === tech.technology)

    if (found) {
      tech.checked = true
    }
  })

  res.render("edit-blog", {
    layout: "index",
    blog: results[0],
    techData,
    isLogin: req.session.isLogin,
    user: req.session.user,
  })
}

const postEditBlog = async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  let { startDate, endDate } = req.body

  startDate = new Date(startDate)
  endDate = new Date(endDate)
  const duration = differenceInMonths(endDate, startDate)

  const image = req.file?.filename
    ? `/${req.file?.filename}`
    : "https://dummyimage.com/600x400/fe4e3/fff"
  console.log(image)
  let { technologies } = req.body

  if (typeof technologies != "object") {
    technologies = [technologies]
  }

  // delete previos image in server
  const [prevImage] = await sequelize.query(`SELECT image FROM "Blogs" WHERE id = ${id}`)
  if (!prevImage[0].image.startsWith("https")) {
    // Perform specific code here for file paths that don't start with 'https'
    fs.unlinkSync(`./src/uploads${prevImage[0].image}`)
  }

  const query = `UPDATE public."Blogs"
                    SET "title"='${title}', 
                    "technologies"=ARRAY ['${technologies}'], 
                    "content"='${content}', 
                    "image"='${image}',
                    "duration"='${duration}', 
                    "updatedAt"=NOW()
                 WHERE id=${id};`

  await sequelize.query(query)

  req.flash("success", "Project successfully edited")
  res.redirect("/")
}

const postDeleteBlog = async (req, res) => {
  try {
    const { id } = req.params
    const query = `DELETE FROM "Blogs" WHERE id = ${id}`
    const [results] = await sequelize.query(`SELECT image FROM "Blogs" WHERE id = ${id}`)

    if (!results[0].image.startsWith("https")) {
      // Perform specific code here for file paths that don't start with 'https'
      fs.unlinkSync(`./src/uploads${results[0].image}`)
    }

    await sequelize.query(query)
    req.flash("success", "Project successfully deleted")
    res.redirect("/")
  } catch (error) {
    console.log(error)
  }
}

const getBlog = async (req, res) => {
  const { id } = req.params
  const [results] = await sequelize.query(`SELECT * FROM "Blogs" WHERE id = ${id}`)
  arraySplit(results[0])

  const techColors = {
    laravel: "#f55247",
    node: "#3c873a",
    golang: "#00add8",
    react: "#61dbfb",
  }

  results[0].technologies = results[0].technologies.map((technology) => {
    const color = techColors[technology] || "#000"
    return { technology, color }
  })

  res.render("blog-detail", {
    layout: "index",
    blog: results[0],
    isLogin: req.session.isLogin,
    user: req.session.user,
  })
}

module.exports = {
  getBlog,
  getCreateBlog,
  getEditBlog,
  postCreateBlog,
  postDeleteBlog,
  postEditBlog,
}
