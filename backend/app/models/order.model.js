/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon index.js
 * @descrition      : user model creates user schema and performs db operation
 * @file            : order.model.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/

const mongoose = require("mongoose");

//creation of schema for order
const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productList: {
      type: Array,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

const order = async (orderDetails, orderId) => {
  let createOrder = new Order({
    productList: orderDetails.productList,
    userId: orderDetails.userId,
    orderId: orderId,
    totalPrice: orderDetails.totalPrice,
  });

  try {
    return await createOrder.save();
  } catch (error) {
    throw error;
  }
};

module.exports = { order };
