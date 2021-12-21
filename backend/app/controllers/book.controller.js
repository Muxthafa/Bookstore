/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon index.js
 *
 * @description     : Get the request, response object from book routes
 *
 * @file            : book.controller.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/

const {
  addCartDetails,
  placeOrder,
  userCart,
  countBooks,
  limitBooks,
  searchItems,
  addUserDetails,
  fetchUserDetails,
  deleteProductFromCart,
  deleteCart
} = require("../service/book.service.js");
const logger = require("../../config/logger");
const { createCustomError } = require("../error-handler/custom-error");

/**
 * @description handles request response for retrieving and returning all the books according to query parameters
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const findAll = async (req, res, next) => {
  const { page, sort } = req.query; //query parameters
  const limit = 12; // 12 books at a time
  const startIndex = (Number(page) - 1) * limit; // index from where the book is searched based on page number
  try {
    const total = await countBooks(); //method to count total number of books
    const books = await limitBooks(limit, startIndex, sort);
    if (!books) {
      return res.status(404).send({
        message: "no data found",
      });
    }
    logger.info(`responded with all books for the user ${req.body.userId}`);
    return res.status(200).json({
      data: books,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / limit),
      totalBooks: total
    });
  } catch (error) {
    logger.error(
      `Error faced while fetching all the Books by User: ${req.body.userId}`
    );
    return next(
      createCustomError("Error occurred while fetching all the Books.", 404)
    );
  }
};

/**
 * @description handles request response for adding a book to the cart.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const addToCart = async (req, res, next) => {
  let cartDetails = {
    userId: req.body.userId,
    book: req.body.book,
    quantity: req.body.quantity,
    cost: req.body.cost,
    counter: req.body.counter,
  };

  try {
    let data = await addCartDetails(cartDetails);
    logger.info(`Added the book to the cart by the user ${req.body.userId}`);
    return res.status(200).json(data);
  } catch (error) {
    logger.error(
      `Error faced while adding a book to the cart by User: ${req.body.userId}`
    );
    return next(createCustomError("Error occurred while adding a book.", 500));
  }
};

/**
 * @description handles request response for searching a book.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const searchBooks = async (req, res, next) => {
  const { searchTerm } = req.query; //includes search key
  try {
    let data = await searchItems(searchTerm);
    if (!data) {
      return res.status(404).send({
        message: "no data found",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return next(
      createCustomError("Error occurred while searching for a book.", 500)
    );
  }
};

/**
 * @description handles request response for fetching cart data.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const getCart = async (req, res) => {
  try {
    let data = await userCart(req.body.userId);
    if (!data) {
      return res.status(404).send({
        message: "no data found",
      });
    }
    return res.status(200).send(data);
  } catch (error) {
    logger.error(
      `Error faced while fetching cart data by the User: ${req.body.userId}`
    );
    return next(
      createCustomError("Error occurred while fetching cart data.", 500)
    );
  }
};

/**
 * @description handles request response for adding/updating customer details.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const addCustomerDetails = async (req, res, next) => {
  let details = {
    userId: req.body.userId,
    name: req.body.name,
    phone: req.body.phone,
    pincode: req.body.pincode,
    locality: req.body.locality,
    address: req.body.address,
    city: req.body.city,
    landmark: req.body.landmark,
    addressType: req.body.addressType,
  };
  try {
    let data = await addUserDetails(details);
    logger.info(`Added address details by the User: ${req.body.userId}`);
    return res.status(200).json(data);
  } catch (error) {
    logger.error(
      `Error faced while adding address details of the User: ${req.body.userId}`
    );
    return next(
      createCustomError("Error faced while adding customer details.", 500)
    );
  }
};

/**
 * @description handles request response for fetching customer details.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const getCustomerDetails = async (req, res, next) => {
  const userId = req.body.userId;
  try {
    let data = await fetchUserDetails(userId);
    if (!data) {
      throw "no data found";
    }
    return res.status(200).json(data);
  } catch (error) {
    logger.error(
      `Error faced while fetching address details of the User: ${req.body.userId}`
    );
    return next(
      createCustomError("Error faced while fetching customer details.", 500)
    );
  }
};

/**
 * @description handles request response for deleting cart data.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const deleteCartProduct = async (req, res, next) => {
  try {
    let data = await deleteProductFromCart(req.body.userId, req.params.id);
    logger.info(
      `Successfully removed the product from the cart by the user: ${req.body.userId}`
    );
    return res.status(200).json(data);
  } catch (error) {
    logger.error(
      `Error faced while removing product from the cart with User: ${req.body.userId}`
    );
    return next(
      createCustomError(
        "Error faced while removing product from the cart.",
        500
      )
    );
  }
};

/**
 * @description handles request response for creating a order.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const createOrder = async (req, res, next) => {
  try {
    let data = await placeOrder(req.body);
    logger.info("create order successfull");
    return res.status(200).json(data);
  } catch (error) {
    logger.error(
      `Error faced while creating an order with User: ${req.body.userId}`
    );
    return next(createCustomError("Error faced while placing an order", 500));
  }
};

/**
 * @description handles request response for removing a cart.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
 const removeCart = async (req, res, next) => {
  try {
    let data = await deleteCart(req.body.userId);
    return res.status(200).json(data);
  } catch (error) {
    logger.error(
      `Error faced while removing cart details, User Id: ${req.body.userId}`
    );
    return next(createCustomError("Error faced while removing cart after placing order", 500));
  }
};

module.exports = {
  findAll,
  addToCart,
  createOrder,
  getCart,
  searchBooks,
  addCustomerDetails,
  getCustomerDetails,
  deleteCartProduct,
  removeCart
};
