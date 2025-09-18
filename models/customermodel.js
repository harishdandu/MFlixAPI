// const mongoose = require('mongoose');

const connection = require("../db");
var mongoose = require("mongoose");
const { Schema } = mongoose;

const TierDetailSchema = new Schema({
    tier: { type: String, required: true },
    id: { type: String, required: true },
    active: { type: Boolean, required: true },
    benefits: [{ type: String }]
}, { _id: false }); // Prevent auto _id for subdocuments

const CustomersSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String },
    birthdate: { type: String }, // storing as string for timestamp value
    email: { type: String, required: true },
    active: { type: Boolean, required: true },
    accounts: [{ type: Number }], // Array of integers
    tier_and_details: {
        type: Map,
        of: TierDetailSchema // each key is an id, value is a TierDetail
    }
});

// module.exports = mongoose.model('customers', CustomersSchema);

const customerModel = connection.model("customers", CustomersSchema);
// Export model
module.exports = customerModel;
