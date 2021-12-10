const mongoose = require("mongoose");

//creation of schema for cart
const CartSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, Ref: "User" },
    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          Ref: "Product",
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

const addCart = async (cartDetails) => {
  let userId = cartDetails.userId;
  let itemList = {
    book: cartDetails.book,
    quantity: cartDetails.quantity,
    cost: cartDetails.cost,
  };
  try {
    let cart = await Cart.findOne({ userId: userId })
      if (cart) {
        const product = cart.items.find((item) => item.book == itemList.book);

        if (product) {
          return await Cart.findOneAndUpdate(
            { userId: userId, "items.book": itemList.book },
            {
              $set: {
                "items.$": {
                  ...itemList,
                  quantity: product.quantity + 1,
                },
              },
            }
          )
        } else {
          return await Cart.findOneAndUpdate(
            { userId: userId },
            {
              $push: {
                items: itemList,
              },
            }
          ).exec()
        }
      } else {
        const cart = new Cart({
          userId: userId,
          items: [itemList],
        });

        return cart.save()
      }
    return cart;
  } catch (error) {
    throw error;
  }
};

const cartDetails = async (userId) => {
  try {
    let data = await Cart.findOne({ userId });
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = { addCart, cartDetails };
