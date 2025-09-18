const express = require("express");
const router = express.Router();

router.use("/user", require("./userroutes/userroutingapi"));
router.use("/dashboard", require("./customerroutes/customerroutesapi"));
router.use("/airbnb", require("./airbnbroutes/airbnbroutesapi"));






module.exports = router;
