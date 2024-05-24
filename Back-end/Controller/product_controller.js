const { response } = require("express");
const Category = require("../Model/Category");
const Product = require("../Model/Product");
const mongoose = require("mongoose");
const { json } = require("body-parser");

const getAllProducts = async (req, res, next) => {
  let products;

  try {
    products = await Product.find()
      .populate("category")
      .select("name price isFeatured category image description");
  } catch (err) {
    console.log("err");
  }
  if (!products) {
    return res.status(404).json({ message: "product not found" });
  } else {
    return res.status(200).json({ products });
  }
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let product;

  try {
    product = await Product.findById(id)
      .populate("category")
      .select("name price description isFeatured image category");
  } catch (err) {
    console.log("err");
  }

  if (!product) {
    return res.status(404).json({ message: "product not found" });
  } else {
    return res.status(200).json({ product });
  }
};
const addProduct = async (req, res, next) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(404).json({ message: "category is not Added!" });
  }

  const file = req.file;
  if (!file) {
    return res.send("pleace add file this can't be empty!");
  }
  /*image upload*/
  const { name, brand, description, price, countInStock, rating, numReviews } =
    req.body;
  let product;

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  try {
    product = new Product({
      name,
      price,
      brand,
      image: `${basePath}${fileName}`,
      description,
      category: req.body.category,
      countInStock,
      rating,
      numReviews,
    });

    product = await product.save();
  } catch (error) {
    console.log(error);
  }
  if (!product) {
    return res.status(500).json({ message: "canot add product" });
  } else {
    return res.status(201).json({ product });
  }
};

const updateProduct = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.json({ message: "invalid product id!" });
  }
  const id = req.params.id;
  /* const category=await Category.findById(req.body.category);
    if(!category){
     return res.status(404).json({message :"invalid category!"});
    } */

  const file = req.file;
  if (!file) {
    return res.send("pleace add file this can't be empty!");
  }

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  const { name, brand, description, price, countInStock, rating, numReviews } =
    req.body;
  let product;

  try {
    product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        brand,
        image: `${basePath}${fileName}`,
        description,
        countInStock,
        rating,
        numReviews,
      },
      {
        new: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res
      .status(404)
      .json({ message: "canot be updated product by this id" });
  } else {
    return res.status(200).json({ product });
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await Product.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res
      .status(404)
      .json({ message: "canot be deleted product by this id" });
  } else {
    return res.status(200).json({ message: "product successfully deleted!" });
  }
};
/*search_product*/

const search_product = async (req, res, next) => {
  /*searching product using query!*/
  // const queryobj={...req.query}
  let products;
  try {
    products = await Product.find({ name: "beauty" })
      .populate("category")
      .select("name price isFeatured category image description");
  } catch (err) {
    console.log("err");
  }
  if (!products) {
    return res.status(404).json({ message: "product not found" });
  } else {
    return res.status(200).json({ products });
  }
};
/*create Aggrigate(count,sum,average,max,min)from the database table functiones about statistics of data in the database! here!!!!*/
const getCount = async (req, res) => {
  let productCount;
  try {
    productCount = await Product.countDocuments();
  } catch (err) {
    console.log("err");
  }
  if (!productCount) {
    return res.status(404).json({ message: "product not found!" });
  } else {
    return res.send({ productCount });
  }
};
/*create gallery of products*/
const productGallery = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.json({ message: "invalid product id!" });
  }
  const files = req.file;
  if (!files) {
    return res.status(404).json({ message: "no files required!" });
  }
  //const fileName=req.file.filename;
  let imagepaths = [];
  const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;
  if (files) {
    files.map((file) => {
      imagepaths.push(`${basePath}${file.fileName}`);
    });
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      images: imagepaths,
    },
    {
      new: true,
    }
  );

  if (!product) {
    return res.status(404).json({ message: "can't update gallary!" });
  }
  response.send(product);
};

/*create function to get the featured products displayed always on the home of our website!!*/
const getFeaturedProducts = async (req, res) => {
  let count = req.params.count ? req.params.count : 0; // how much items you want to display in home page!
  let products;
  try {
    products = await Product.find({ isFeatured: true }).limit(+count);
  } catch (error) {
    res.send({ message: error.message });
  }
  if (!products) {
    return res.status(404).json({ message: "product not found!" });
  } else {
    return res.send({ products: products });
  }
};
/* create product review function */

const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };
  //search the requested product if it is in the database using the id filter it first
  const product = await Product.findById(productId);
  /*
                    then step two check weather this product was reviewd by this user or not
                    1:if it was reviewd before by this user just write a function to update the review
                    2:if this product was not reviewd by this user before then write a function
                    to create new review.ended!!
                  */
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviwes = product.reviews.lenght;
    p;
  }
  await product.save();
  res.status(200).json({
    success: true,
  });
};
/*Get Product Review of a product function!*/

const getProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.body.id);
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};
/*create delete product review function!*/
const deleteReviews = async (req, res, next) => {
  //filter the product first
  const product = await Product.findById(req.body.productId);
  //filter the review with review id or req.query
  const reviews = product.reviews.filter(
    (r) => r.review._id.toString() === req.query.id.toString()
  );
  const numOfReviews = reviews.length;
  const ratings =
    product.reviews.reduce(acc, (item) => acc + item.rating, 0) /
    reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

module.exports = {
  getAllProducts,
  addProduct,
  getById,
  updateProduct,
  deleteProduct,
  productGallery,
  getCount,
  search_product,
  getFeaturedProducts,
  createProductReview,
  getProductReviews,
  deleteReviews,
};
