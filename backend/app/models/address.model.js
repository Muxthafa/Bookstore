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
    // Save user in the database
    let user = await Address.findOne({userId: details.userId})
    if(!user){
      return await address.save({})
    }else{
      return await Address.findOneAndUpdate({userId: details.userId}, details, {new:true})
    }
  } catch (error) {
    throw error
  }
};

const getUserDetails = async (userId) => {
    try {
        // Save user in the database
        return await Address.findOne({userId: userId})
      } catch (error) {
        throw error
      }
}

module.exports = { postCustomerDetails, getUserDetails};
