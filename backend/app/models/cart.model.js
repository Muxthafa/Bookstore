const mongoose = require("mongoose");

//creation of schema for cart
const CartSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
  console.log(cartDetails.counter);
  try {
    let cart = await Cart.findOne({ userId: userId });
    if (cart) {
      const product = cart.items.find((item) => item.book == itemList.book);

      if (product) {
        if(cartDetails.counter == "increment"){
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
          );
        }else{
          return await Cart.findOneAndUpdate(
            { userId: userId, "items.book": itemList.book },
            {
              $set: {
                "items.$": {
                  ...itemList,
                  quantity: product.quantity - 1,
                },
              },
            }
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

const cartDetails = (userId) => {
  return Cart.findOne({ userId: userId })
    .populate("userId", "firstName")
    .exec()
    .then((data) => {
      return data;
    })
    .catch((err) => err);
};

module.exports = { addCart, cartDetails };
