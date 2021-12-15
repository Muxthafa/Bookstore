/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon index.js
 *
 * @description     : routes for books
 *
 * @file            : books.routes.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 8-dec-2021
 *
 **************************************************************************/

const express = require("express");
const router = express.Router(); //middleware creates route handler
const books = require("../controllers/book.controller.js");
const validate = require("../validation/user.validation.js");
const { authorizeUser } = require("../middleware/user.middleware.js");

//get all users
router.get("/", books.findAll);

//route to add product to the cart
router.post("/add-to-cart", authorizeUser, books.addToCart);

//route to retrieve cart details
router.get("/cart", authorizeUser, books.getCart);

//route to remove a product with the book id from the cart
router.delete("/cart/:id", authorizeUser, books.deleteCartProduct);

//creates an order
router.post("/order", authorizeUser, books.createOrder);

//search route to find the books based on search query
router.get("/search", authorizeUser, books.searchBooks);

//route which adds customer address details
router.post("/customer-details", authorizeUser, books.addCustomerDetails);

//route to get address details
router.get("/customer-details", authorizeUser, books.getCustomerDetails);

module.exports = router; //exports the Router object
