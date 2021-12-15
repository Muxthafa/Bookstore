/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon index.js
 *
 * @description     : Get the values from the service and process them for the address model in Bookstore
 *
 * @file            : address.models.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/

const mongoose = require("mongoose");

//creation of schema for Address collection
const AddressSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: Number, required: true },
    locality: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    landmark: { type: String, required: true },
    addressType: {type: String, enum: ["Home", "Work", "Other"], required: true}
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", AddressSchema);


/**
 * @description Query to create a Customer address, if an user address already exists it updates
 * @param {Object} details
 * @returns error or data
 */
const postCustomerDetails = async (details) => {
  const address = new Address({
    userId: details.userId,
    name: details.name,
    phone: details.phone,
    pincode: details.pincode,
    locality: details.locality,
    address: details.address,
    city: details.city,
    landmark: details.landmark,
    addressType: details.addressType
  });

  try {
    let user = await Address.findOne({userId: details.userId})
    if(!user){
      return await address.save({})
    }
    return await Address.findOneAndUpdate({userId: details.userId}, details, {new:true})
  } catch (error) {
    throw error
  }
};


/**
 * @description Query to fetch the customer address details from the db
 * @param userId
 * @returns error or data
 */
const getUserDetails = async (userId) => {
    try {
        return await Address.findOne({userId: userId})
      } catch (error) {
        throw error
      }
}

module.exports = { postCustomerDetails, getUserDetails};
