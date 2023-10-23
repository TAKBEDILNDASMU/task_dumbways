module.exports.arraySplit = (blog) => {
  blog.technologies.forEach((techs) => {
    blog.technologies = techs.split(",")
  })
}
