// const mongoose = require('mongoose');

const connection = require("../db");
var mongoose = require("mongoose");
const { Schema } = mongoose;

const AccountsSchema = new Schema({
    account_id: { type: Number, required: true },
    limit: { type: Number, required: true },
    products: [{ type: String, required: true }]
});

// module.exports = mongoose.model('accountProducts', AccountProductsSchema);

const accountsModel = connection.model("accounts", AccountsSchema);
// Export model
module.exports = accountsModel;
