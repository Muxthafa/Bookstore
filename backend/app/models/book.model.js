/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon index.js
 *
 * @description     : Get the values from the service and process them for the Product model in Bookstore
 *
 * @file            : book.models.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/

const mongoose = require("mongoose");

//creation of schema for product collection
const ProductSchema = mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true },
    image: String,
    basePrice: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

/**
 * @description Query to find all books
 * @param {callback} callback
 * @returns error or callback
 */
const findBooks = (callback) => {
  return Product.find({}, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description Query to find total number of books in db
 * @returns error or count of books
 */
const count = async () => {
  try {
    return await Product.countDocuments({});
  } catch (error) {
    throw error;
  }
};

/**
 * @description Query to fetch books from db based on sort attribute
 * @param max
 * @param startIndex
 * @param sort
 * @returns error or books data
 */
const fetchBooks = async (max, startIndex, sort) => {
  try {
    if (sort == "low") {
      return await Product.find()
        .sort({ price: 1 })
        .limit(max)
        .skip(startIndex);
    } else if (sort == "high") {
      return await Product.find()
        .sort({ price: -1 })
        .limit(max)
        .skip(startIndex);
    } else {
      return await Product.find().sort({ _id: -1 }).limit(max).skip(startIndex);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * @description Query to fetch books from db based on search query
 * @param searchTerm
 * @returns error or books data
 */
const getBooksBySearch = async (searchTerm) => {
  try {
    const searchQuery = new RegExp(searchTerm, "i");
    return await Product.find({
      $or: [{ author: searchQuery }, { title: searchQuery }],
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { findBooks, count, fetchBooks, getBooksBySearch };
