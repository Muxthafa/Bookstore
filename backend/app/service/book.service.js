/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon index.js
 *
 * @description     : Get the values from the controller and process them for the books in various models
 *
 * @file            : book.service.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/

const {
  findBooks,
  count,
  fetchBooks,
  getBooksBySearch,
} = require("../models/book.model.js");

const {
  addCart,
  cartDetails,
  deleteBookFromCart,
} = require("../models/cart.model.js");

const { order } = require("../models/order.model.js");

const {
  postCustomerDetails,
  getUserDetails,
} = require("../models/address.model.js");

/**
 * @description find all the books
 * @param {callback} callback
 * @returns error or data
 */
const findAllBooks = (callback) => {
  findBooks((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description extracting product details and providing it to cart model
 * @returns error or data
 */
const addCartDetails = async (cartDetails) => {
  try {
    let data = await addCart(cartDetails);
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Using user id to find all the products in the cart
 * @param userId
 * @returns error or data
 */
const userCart = async (userId) => {
  try {
    return await cartDetails(userId);
  } catch (error) {
    throw error;
  }
};

/**
 * @description count total number of books in the book model
 * @returns error or data
 */
const countBooks = async () => {
  try {
    return await count();
  } catch (error) {
    throw error;
  }
};

/**
 * @description extracting details required to fetch number of books per page
 * @param limit
 * @param startIndex
 * @param sort
 * @returns error or data
 */
const limitBooks = async (limit, startIndex, sort) => {
  try {
    return await fetchBooks(limit, startIndex, sort);
  } catch (error) {
    throw error;
  }
};

/**
 * @description extracting search key required to search for the books in the database
 * @param searchTerm
 * @returns error or data
 */
const searchItems = async (searchTerm) => {
  try {
    return await getBooksBySearch(searchTerm);
  } catch (error) {
    throw error;
  }
};

/**
 * @description extracting customer details required to update customer info
 * @param details
 * @returns error or data
 */
const addUserDetails = async (details) => {
  try {
    return await postCustomerDetails(details);
  } catch (error) {
    throw error;
  }
};

/**
 * @description extracting userId required to fetch user address details
 * @param userId
 * @returns error or data
 */
const fetchUserDetails = async (userId) => {
  try {
    return await getUserDetails(userId);
  } catch (error) {
    throw error;
  }
};

/**
 * @description service for cart model as it required to delete particular product
 * @param userId
 * @param bookId
 * @returns error or data
 */
const deleteProductFromCart = async (userId, bookId) => {
  try {
    return await deleteBookFromCart(userId, bookId);
  } catch (error) {
    throw error;
  }
};

/**
 * @description
 * @returns error or data
 */
const placeOrder = async (orderDetails) => {
  try {
    let data = await order(orderDetails);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAllBooks,
  addCartDetails,
  placeOrder,
  userCart,
  countBooks,
  limitBooks,
  searchItems,
  addUserDetails,
  fetchUserDetails,
  deleteProductFromCart,
};
