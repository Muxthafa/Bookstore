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
    maxBook
  } = require("../models/book.model.js");

  const {
      addCart,
      cartDetails
  } = require('../models/cart.model.js')

  const {
    order
} = require('../models/order.model.js')

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
        console.log(data);
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
}

const countBooks = async () => {
  try {
    return await count()
  } catch (error) {
    throw error
  }
}

const limitBooks = async (limit , startIndex) => {
  try {
    return await maxBook(limit , startIndex)
  } catch (error) {
    throw error
  }
}

module.exports = {findAllBooks, addCartDetails, placeOrder, userCart, countBooks, limitBooks}