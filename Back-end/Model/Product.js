const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    default: "",
  },

  image: {
    type: String,
    default: "",
  },
  description: [
    {
      type: String,
      default: "",
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId, //how to connect one table to another using forien key in RDBMS id(obj_id)
    ref: "Category",
    default: "",
  },

  countInStock: {
    type: Number,
    default: "",
    min: 0,
    max: 255,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        default: "",
      },
      name: {
        type: String,
        default: "",
      },
      rating: {
        type: Number,
        default: "",
      },
      comment: {
        type: String,
        default: "",
      },
    },
  ],

  numReviews: {
    type: Number,
    default: 0,
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },

  isInstock: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
