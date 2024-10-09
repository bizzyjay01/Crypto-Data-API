const cryptoValidation = (req, res, next) =>{
    // Check if the 'coin' parameter is provided

    try {
        const {coin} = req.query
        const errors = [];

        if (!coin) {
            errors.push("Please provide a coin parameter (e.g., 'bitcoin').");
        }

        const supportedCoins = ["bitcoin", "ethereum", "matic-network"];
    
        // Check if the requested coin is one of the supported coins
        if (!supportedCoins.includes(coin)) {
            errors.push(`Unsupported coin. Supported coins are: ${supportedCoins.join(
                    ", "
                )}.`)
    
        }

        if (errors.length > 0) {
			return res.status(400).json({ message: errors });
		}

        next()


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = cryptoValidation