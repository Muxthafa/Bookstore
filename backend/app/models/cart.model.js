/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon index.js
 *
 * @description     : Get the values from the service and process them for the Cart model in Bookstore
 *
 * @file            : cart.models.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/

const mongoose = require("mongoose");

//creation of schema for cart
const CartSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        cost: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);

/**
 * @description Query to create a cart, if the same product exists in cart it updates the quantity or else adds new product to the cart
 * @param {Object} cartDetails
 * @returns error or cart data
 */
const addCart = async (cartDetails) => {
  let userId = cartDetails.userId;
  let itemList = {
    book: cartDetails.book,
    quantity: cartDetails.quantity,
    cost: cartDetails.cost,
  };
  try {
    let cart = await Cart.findOne({ userId: userId });
    if (cart) {
      const product = cart.items.find((item) => item.book == itemList.book);
      if (product) {
        if (cartDetails.counter == "increment") {
          return await Cart.findOneAndUpdate(
            { userId: userId, "items.book": itemList.book },
            {
              $set: {
                "items.$": {
                  ...itemList,
                  quantity: product.quantity + 1,
                },
              },
            },
            { new: true }
          );
        } else {
          return await Cart.findOneAndUpdate(
            { userId: userId, "items.book": itemList.book },
            {
              $set: {
                "items.$": {
                  ...itemList,
                  quantity: product.quantity - 1,
                },
              },
            },
            { new: true }
          );
        }
      } else {
        return await Cart.findOneAndUpdate(
          { userId: userId },
          {
            $push: {
              items: itemList,
            },
          }
        ).exec();
      }
    } else {
      const cart = new Cart({
        userId: userId,
        items: [itemList],
      });

      return cart.save();
    }
    return cart;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Query to fetch cart details of the user from db
 * @param userId
 * @returns error or cart&book details
 */
const cartDetails = async (userId) => {
  try {
    let data = await Cart.findOne({ userId }).populate({
      path: "items.book",
      select: ["title", "author", "price", "image"],
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @description Query to delete a book from the book array in the cart
 * @param userId
 * @param bookId
 * @returns error or cart&book details
 */
const deleteBookFromCart = async (userId, bookId) => {
  try {
    let user = await Cart.findOne({ userId: userId });
    let newItems = user.items.filter((item) => {
      return item.book != bookId;
    });
    return await Cart.findOneAndUpdate(
      { userId: userId },
      { items: newItems },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

/**
 * @description Query to delete cart after order is being placed
 * @param userId
 * @returns error or cart&book details
 */
const deleteCartDetails = async (userId) => {
  try {
    return await Cart.findOneAndRemove(
      { userId: userId })
  } catch (error) {
    throw error;
  }
};

module.exports = { addCart, cartDetails, deleteBookFromCart, deleteCartDetails};
