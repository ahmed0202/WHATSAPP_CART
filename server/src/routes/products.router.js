const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const {
  uploadMulterFile,
  handleMulterError,
  singleFileValidation,
} = require("../controllers/middlewares/multerIndex");
const router = express();

router.get("/", getAllProducts());
router.post(
  "/create",
  uploadMulterFile.single("file"),
  handleMulterError,
  singleFileValidation,
  createProduct()
);
router.put(
  "/update",
  uploadMulterFile.single("file"),
  handleMulterError,
  singleFileValidation,
  updateProduct()
);
router.delete("/:product_id/delete", deleteProduct());

module.exports = router;
