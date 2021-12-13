/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
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
const {
    authorizeUser,
  } = require("../middleware/user.middleware.js");

//get all users
router.get("/", books.findAll);

router.post("/add-to-cart", authorizeUser, books.addToCart)

router.get("/cart",authorizeUser, books.getCart)

router.post("/order", authorizeUser, books.createOrder)

router.get("/search", authorizeUser, books.searchBooks)

router.post("/customer-details", authorizeUser, books.addCustomerDetails)

router.get("/customer-details", authorizeUser, books.getCustomerDetails)

module.exports = router; //exports the Router object