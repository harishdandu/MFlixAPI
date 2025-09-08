const express = require("express");
const router = express.Router();

router.use("/user", require("./userroutes/userroutingapi"));






module.exports = router;
