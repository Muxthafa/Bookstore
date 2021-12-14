/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * @description     : get the values from the controller and process them for the books in book model
 *
 * @file            : book.service.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 1-2-2019
 *
 **************************************************************************/

const {
    findBooks,
    count,
    maxBook,
    getBooksBySearch
  } = require("../models/book.model.js");

  const {
      addCart,
      cartDetails,
      deleteBookFromCart
  } = require('../models/cart.model.js')

  const {
    order
} = require('../models/order.model.js')

const {postCustomerDetails, getUserDetails} = require('../models/address.model.js')

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

const addCartDetails = async (cartDetails) => {
    try{
        let data = await addCart(cartDetails)
        return data
    }catch(error){
        throw error
    }
}

const placeOrder = async (orderDetails) => {
  try {
    let data = await order(orderDetails)
    return data
  } catch (error) {
    throw error
  }
}

const userCart = async (userId) => {
    try {
      return await cartDetails(userId)
    } catch (error) {
      throw error
    }
};

const countBooks = async () => {
  try {
    return await count()
  } catch (error) {
    throw error
  }
}

const limitBooks = async (limit , startIndex, sort) => {
  try {
    return await maxBook(limit , startIndex, sort)
  } catch (error) {
    throw error
  }
}

const searchItems = async (searchTerm) => {
  try {
    return await getBooksBySearch(searchTerm)
  } catch (error) {
    throw error
  }
}

const addUserDetails = async (details) => {
  try {
    return await postCustomerDetails(details)
  } catch (error) {
    throw error
  }
}

const fetchUserDetails = async (userId) => {
  try {
    return await getUserDetails(userId)
  } catch (error) {
    throw error
  }
}

const deleteProductFromCart = async (userId,book) => {
  try {
    return await deleteBookFromCart(userId,book)
  } catch (error) {
    throw error
  }
}


module.exports = {findAllBooks, addCartDetails, placeOrder, userCart, countBooks, limitBooks, searchItems, addUserDetails, fetchUserDetails, deleteProductFromCart}