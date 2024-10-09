const express = require("express");
const {fetchCryptoData} = require("../controllers/fetchCryptoData");
;

const router = express.Router();

router.get("/cryptos", fetchCryptoData);



module.exports = router;
