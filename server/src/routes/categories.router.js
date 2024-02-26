const express = require("express");
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controller");

const router = express();

router.get("/", getAllCategories());
router.post("/create", createCategory());
router.put("/update", updateCategory());
router.delete("/:category_id/delete", deleteCategory());

module.exports = router;
