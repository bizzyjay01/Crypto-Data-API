const express = require("express");
const cryptoValidation = require("../middleware/validation");
const priceStandardDeviation = require("../controllers/cryptoStandardDeviation");

const router = express.Router();

router.get("/deviation", cryptoValidation, priceStandardDeviation)

module.exports = router