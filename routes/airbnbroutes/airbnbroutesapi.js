const express = require("express");
const router = express.Router();
// const sendResponse = require("../../lib/sendResponse");
const { airbnbService } = require("../../services/airbnbservice");

router.get("/getAllListings", async (req, res) => {
    try {
      let data = await airbnbService.fcnGetAllListings(
        req.query
      );
      res.status(200).send(data);
    } catch (err) {
      // await sendResponse(err, res);
      await res.status(500).send({ code: 500, errors: [{ message: "An unexpected error occurred. Please try again." }] });
    }
  });

module.exports = router;