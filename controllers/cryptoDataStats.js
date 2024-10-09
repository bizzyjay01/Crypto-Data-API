const Crypto = require("../models/cryptoModel");

const getDataStats = async (req, res) => {
	try {
		const { coin } = req.query;

		
		// Find the latest data for the requested coin from the database
		const cryptoData = await Crypto.findOne({ id: coin }).sort({
			createdAt: -1,
		});

		// Check if any data was found for the requested coin
		if (!cryptoData) {
			return res
				.status(404)
				.json({ message: `No data found for the coin: ${coin}.` });
		}

		const response = {
			price: cryptoData.current_price,
			marketCap: cryptoData.market_cap,
			"24hChange": cryptoData.price_change_24h,
            "24hChangePercentage": cryptoData.price_change_percentage_24h
		};

		return res.status(200).json({
			message: `Latest data about ${cryptoData.name} returned successfully`,

			response,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = getDataStats;
