const express = require("express")
const router = express.Router()
const upload = require("../middlewares/uploadFile")
const restricted = require("../middlewares/restricted")

const {
  getBlog,
  getCreateBlog,
  getEditBlog,
  postCreateBlog,
  postDeleteBlog,
  postEditBlog,
} = require("../controllers/Blog.controller")

router.get("/create", restricted, getCreateBlog)
router.post("/create", restricted, upload.single("upload-image"), postCreateBlog)
router.get("/edit/:id", restricted, getEditBlog)
router.post("/edit/:id", upload.single("upload-image"), postEditBlog)
router.delete("/delete/:id", restricted, postDeleteBlog)
router.get("/:id", getBlog)

module.exports = router
