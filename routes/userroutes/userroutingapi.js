// routes/userroutes/userroutingapi.js
const express = require("express");
const router = express.Router();
// const sendResponse = require("../../lib/sendResponse");
const { loginService } = require("../../services/loginservice");
const { registrationService } = require("../../services/registrationservice");

// Example: GET /user/
router.get("/", (req, res) => {
  res.send("User API is working 🚀");
});

router.post("/login", async (req, res) => {
  try {
    let data = await loginService.fcnLogin(
      req.body
    );
    res.status(200).send(data);
  } catch (err) {
    // await sendResponse(err, res);
    await res.status(500).send({ code: 500, errors: [{ message: "An unexpected error occurred. Please try again." }] });
  }
});

router.post("/registration", async (req, res) => {
  try {
    let data = await registrationService.fcnRegistration(
      req.body
    );
    res.status(200).send(data);
  } catch (err) {
    // await sendResponse(err, res);
    await res.status(500).send({ code: 500, errors: [{ message: "An unexpected error occurred. Please try again." }] });
  }
});

module.exports = router;   // <-- IMPORTANT
