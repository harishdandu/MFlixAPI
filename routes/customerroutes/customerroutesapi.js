// routes/userroutes/userroutingapi.js
const express = require("express");
const router = express.Router();
// const sendResponse = require("../../lib/sendResponse");
const { customerService } = require("../../services/customerservice");

// Example: GET /user/
router.get("/", (req, res) => {
  res.send("User API is working 🚀");
});

router.get("/getAllCustomers", async (req, res) => {
  try {
    let data = await customerService.fcnGetAllCustomers(
      req.query
    );
    res.status(200).send(data);
  } catch (err) {
    // await sendResponse(err, res);
    await res.status(500).send({ code: 500, errors: [{ message: "An unexpected error occurred. Please try again." }] });
  }
});

router.get("/getTransactionsByAccountNo", async (req, res) => {
  try{
    let data = await customerService.fcnGetTransactionsByAccountNo(
      req.query
    );
    res.status(200).send(data); 
  } catch(err) {
    // await sendResponse(err, res);
    await res.status(500).send({ code: 500, errors: [{ message: "An unexpected error occurred. Please try again." }] });
  }
});

router.get("/getProductDetails", async (req, res) => {
  try {
    let data = await customerService.fcnGetProductDetais(
      req.query
    );
    res.status(200).send(data);
  } catch (err) {
    // await sendResponse(err, res);
    await res.status(500).send({ code: 500, errors: [{ message: "An unexpected error occurred. Please try again." }] });
  }
});



module.exports = router;   // <-- IMPORTANT
