const mongoose = require("mongoose");


//creation of schema for order
const OrderSchema = mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId , Ref: "User"},
    cartId: {type: mongoose.Schema.Types.ObjectId , Ref: "Cart"},
    TotalPrice: {type: Number, required: true}
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

const order = async (orderDetails) => {
    // let data =  await Order.findOne({cartId: orderDetails.cartId})
    //     .populate({path: "cartId", select: "items"})
    //     .exec()
    
        const placeOrder = new Order({
            userId: orderDetails.userId,
            cartId: orderDetails.cartId,
            TotalPrice: orderDetails.amount
        })

        try {
            return await placeOrder.save()
        } catch (error) {
            throw error
        }
        

}

module.exports ={order}