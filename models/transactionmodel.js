// const mongoose = require('mongoose');

const connection = require("../db");
var mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    date: { type: Number, required: true },
    amount: { type: Number, required: true },
    transaction_code: { type: String, required: true },
    symbol: { type: String, required: true },
    price: { type: String, required: true },
    total: { type: String, required: true }
}, { _id: false }); // Prevent auto _id for subdocuments

const TransactionBucketSchema = new Schema({
    account_id: { type: Number, required: true },
    transaction_count: { type: Number, required: true },
    bucket_start_date: { type: Number, required: true },
    bucket_end_date: { type: Number, required: true },
    transactions: [TransactionSchema]
});

// module.exports = mongoose.model('transactions', TransactionBucketSchema);

const transactionModel = connection.model("transactions", TransactionBucketSchema);
// Export model
module.exports = transactionModel;
