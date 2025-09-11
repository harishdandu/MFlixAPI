const customers = require("../models/customermodel");
const transactions = require("../models/transactionmodel");
const accounts = require("../models/accounts");

async function fcnGetAllCustomers(
    data
) {
    try {
        console.log("data in service", data);
        const pageNo = data.pageNo;
        const limit = data.pageSize;
        const searchText = data.searchText;

        // Build query object
        let query = {};

        if (searchText && searchText.trim() !== "") {
            query = {
                $or: [
                    { name: { $regex: searchText, $options: "i" } }
                ]
            };
        }

        // Convert pageNo and limit to integers
        const pageNumber = parseInt(pageNo, 10);
        const limitNumber = parseInt(limit, 10);

        // Fetch customers with pagination
        const customersData = await customers.find(query)
            .skip(pageNumber * limitNumber)
            .limit(limitNumber);

        // Get total count for pagination
        const totalCount = await customers.countDocuments(query);

        return {
            statusCode: "S",
            customers: customersData,
            totalCount: totalCount,
            pageNo: pageNumber,
            limit: limitNumber
        };
    } catch (err) {
        logger.error("Error: " + err);
        throw err;
    }
}

async function fcnGetTransactionsByAccountNo(
    data
) {
    try {
        console.log("data in service", data);
        const accountNo = data.accountNo;

        if (!accountNo) {
            return { message: "Account number is required", statusCode: "F" };
        }

        const response = await transactions.find({ account_id: parseInt(accountNo) });
        const accountProducts = await accounts.find({ account_id: parseInt(accountNo) });

        console.log("Transaction response:", response.length, response[0].transactions.length, accountProducts);
        let transactionsData = [];
        let productsData = [];
        if(response.length === 0){
            transactionsData = [];
            console.log("No transactions found");
        }else{
            
            transactionsData = response[0].transactions;
            console.log("Transactions found:", response.length);

        }
        if(accountProducts.length === 0){
            productsData = [];
        }else{
            productsData = accountProducts[0].products;
        }
        return { statusCode: "S", transactions: transactionsData , products: productsData};
    } catch (err) {
        logger.error("Error: " + err);
        throw err;
    }
}

async function fcnGetProductDetais(data){
    try{
        const searchText = data.searchText;
        if (!searchText) {
            throw new Error("searchText is required");
        }

        const pipeline = [
            {
                $match: {
                    products: {
                        $elemMatch: {
                            $regex: searchText,
                            $options: "i"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "account_id",
                    foreignField: "accounts",
                    as: "customerInfo"
                }
            },
            {
                $unwind: "$customerInfo"
            },
            {
                $addFields: {
                    matchedProduct: {
                        $first: {
                            $filter: {
                                input: "$products",
                                as: "product",
                                cond: {
                                    $regexMatch: {
                                        input: "$$product",
                                        regex: searchText,
                                        options: "i"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    product: "$matchedProduct",
                    account_id: 1,
                    name: "$customerInfo.name",
                    email: "$customerInfo.email",
                    _id: 0
                }
            },
            {
                $group: {
                    _id: "$account_id",
                    product: { $first: "$product" },
                    name: { $first: "$name" },
                    email: { $first: "$email" }
                }
            },
            {
                $project: {
                    account_id: "$_id",
                    product: 1,
                    name: 1,
                    email: 1,
                    _id: 0
                }
            }
        ];

        const result = await accounts.aggregate(pipeline).exec();
        console.log("Aggregation result:", result);
        return result;
    }catch(err){
        logger.error("Error: " + err);
        throw err;
    }
}


exports.customerService = {
    fcnGetAllCustomers: fcnGetAllCustomers,
    fcnGetTransactionsByAccountNo: fcnGetTransactionsByAccountNo,
    fcnGetProductDetais : fcnGetProductDetais
}