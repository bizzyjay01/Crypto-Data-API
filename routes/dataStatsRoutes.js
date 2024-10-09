const express = require("express");
const getDataStats = require("../controllers/cryptoDataStats");
const cryptoValidation = require("../middleware/validation");

const router = express.Router();

router.get("/stats",cryptoValidation, getDataStats)

module.exports = router