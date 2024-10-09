const Crypto = require("../models/cryptoModel");

const priceStandardDeviation = async (req, res) => {
	try {
		// Function to calculate standard deviation
		const calculateStandardDeviation = (prices) => {
			const n = prices.length;
			const mean = prices.reduce((acc, price) => acc + price, 0) / n;
			const variance =
				prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / n;
			return Math.sqrt(variance);
		};

		const { coin } = req.query;

		const cryptoData = await Crypto.find({ id: coin })
			.sort({ createdAt: -1 })
			.limit(100); // Limit to the last 100 records

		// Check if any data was found for the requested coin
		if (cryptoData.length === 0) {
			return res
				.status(404)
				.json({ message: `No data found for the coin: ${coin}.` });
		}

		// Extract prices from the fetched records
		const prices = cryptoData.map((data) => {
			return data.current_price;
		});

		const standardDeviation = calculateStandardDeviation(prices);

		
		return res.status(200).json({ standardDeviation: standardDeviation.toFixed(2) }); // Format to 2 decimal places

	} catch (error) {
        return res.status(500).json({message: error.message})
    }
};

module.exports = priceStandardDeviation