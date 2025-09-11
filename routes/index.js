const express = require("express");
const router = express.Router();

router.use("/user", require("./userroutes/userroutingapi"));
router.use("/dashboard", require("./customerroutes/customerroutesapi"));






module.exports = router;
