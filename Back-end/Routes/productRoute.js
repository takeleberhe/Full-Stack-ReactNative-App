const express = require("express");
/* import controller functions */
const {
  getAllProducts,
  addProduct,
  getById,
  updateProduct,
  search_product,
  getCount,
  deleteProduct,
  getFeaturedProducts,
  createProductReview,
  getProductReviews,
  deleteReviews,
} = require("../Controller/product_controller");
/* import middleware functions */
const { uploadImage } = require("../Middlewares/imageUploadMdw");
const { verifyToken, isAuth } = require("../Middlewares/authMiddleware");
const prodRouter = express.Router();
// route api
prodRouter.get("/products",getAllProducts);
prodRouter.post("/products", uploadImage.single("image"), addProduct);
prodRouter.get("/products/:id", getById);
prodRouter.patch("/products/:id", updateProduct);
prodRouter.get("/products/get/count", getCount);
prodRouter.get("/featuredproducts/:count", getFeaturedProducts);
prodRouter.get("/products/search", search_product);
prodRouter.put("/products/createreview", createProductReview);
prodRouter.get("/products/getreview/:id", getProductReviews);
prodRouter.delete("/products/deltereview/:id", deleteReviews);
prodRouter.delete("/products/:id", deleteProduct);

module.exports = prodRouter;
