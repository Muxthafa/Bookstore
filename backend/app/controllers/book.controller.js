/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : get the request, response object from book routes               
 * 
 * @file            : book.controller.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 8-Dec-2021
 * 
 **************************************************************************/

const {
    findAllBooks,
    addCartDetails,
    placeOrder,
    userCart,
    countBooks,
    limitBooks
  } = require("../service/book.service.js");
  const logger = require("../../config/logger");
  const { createCustomError } = require("../error-handler/custom-error");

  /**
 * @description handles request response for retrieving and return all books from the database.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const findAll = async (req, res, next) => {

  const {page} = req.query;
  console.log(page);
  const limit = 8
  const startIndex = (Number(page) - 1)*limit
  
  try{
    const total = await countBooks()
    const posts = await limitBooks(limit,startIndex)
    return res.status(200).send(posts)
  }catch(error){
    const total=0
  }
    // findAllBooks((error, data) => {
    //   if (error) {
    //     return next(
    //       createCustomError("Error occurred while fetching all the Books.", 404)
    //     );
    //   }
    //   if (!data) {
    //     return res.status(404).send({
    //       message: "no data found",
    //     });
    //   }
    //   const response = {
    //     count: data.length,
    //     Books: data.map((book) => {
    //       return {
    //         author: book.author,
    //         title: book.title,
    //         image: book.image,
    //         basePrice: book.basePrice,
    //         description: book.description,
    //         _id: book._id,
    //         request: {
    //           type: "GET",
    //           url: "http://localhost:3000/books/"
    //         },
    //       };
    //     }),
    //   };
    //   logger.info("responded with all books");
    //   return res.status(200).json(response);
    // });
  };

  const addToCart = async (req,res,next) => {
      let cartDetails ={
        userId : req.body.userId,
        book : req.body.book,
        quantity: req.body.quantity,
        cost: req.body.cost
      }
      try{
        let data = await addCartDetails(cartDetails)
        return res.status(200).json(data);
      }catch(error){
        return res.status(500).send("error")
      }
      
  }

  const createOrder = async (req,res,next) => {
    let orderDetails ={
      userId : req.body.userId,
      cartId: req.body.cartId,
      amount: req.body.amount
    }
    try {
      let data = await placeOrder(orderDetails)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  const getCart = async (req,res,next) => {
    try {
      let data = await userCart(req.body.userId)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    }
  }

  module.exports = {findAll, addToCart, createOrder, getCart}