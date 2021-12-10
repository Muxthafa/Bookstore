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

const count = async () => {
  try {
    return await Product.countDocuments({})
  } catch (error) {
    throw error
  }
  
}

const maxBook = async (max, startIndex) => {
  try {
    return await Product.find().sort({ _id: -1}).limit(max).skip(startIndex)
  } catch (error) {
    throw error
  }
  
}

module.exports = {findBooks, count, maxBook}