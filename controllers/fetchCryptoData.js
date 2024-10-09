const axios = require("axios");
const fetch = require("node-fetch");
const Crypto = require("../models/cryptoModel")

const fetchCryptoDataFromAPI = async () => {
	try {
		const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,matic-network,ethereum";
		const options = { method: "GET", headers: { accept: "application/json" } };

		const response = await fetch(url, options);

		const data = await response.json()
		// console.log(data)
		
		const savedCryptoData = []

		for (const coin of data) {
			const {id, symbol, name, current_price, market_cap, price_change_24h, price_change_percentage_24h} = coin

			console.log(`Saving data for: ${name} (${symbol})`)

			const cryptoData = new Crypto({
				id: id,
				symbol: symbol,
				name: name,
				current_price: current_price,
				market_cap: market_cap,
				price_change_24h:price_change_24h,
				price_change_percentage_24h:price_change_percentage_24h

			})

			const savedCoin = await cryptoData.save()

			savedCryptoData.push(savedCoin)

			console.log(`Successfully saved data for: ${name} (${symbol})`);

			
		}
		return savedCryptoData

	} catch (error) {
		console.error('Error fetching crypto data:', error);
	}
};

const fetchCryptoData = async(req, res) =>{
	try {
		const data = await fetchCryptoDataFromAPI()

		return res.status(200).json({
			message: "All Crypto data successfully saved to the database",
			data,
		  });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	
}

module.exports = {
	fetchCryptoDataFromAPI, 
	fetchCryptoData
}

