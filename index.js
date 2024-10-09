const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cron = require("node-cron");
const connectDB = require("./db");
const { fetchCryptoDataFromAPI } = require("./controllers/fetchCryptoData");
const cryptoDataRouter = require("./routes/fetchCryptoRoutes");
const dataStatsRouter = require("./routes/dataStatsRoutes")
const standardDeviationRouter = require("./routes/standardDeviationRoutes")


const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// Schedule the job to run every 2 hours
cron.schedule("0 */2 * * *", async () => {
	console.log("Running Cron Job - Fetching Crypto Data");
	try {
		await fetchCryptoDataFromAPI();
        console.log("Cron job completed successfully");

	} catch (error) {
		console.error('Cron job error:', error.message);
	}
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server started running on Port ${PORT}`);
});

app.get("/", (req, res) => {
	return res.status(200).json({ message: "Welcome to crypto server" });
});

app.use("/api", cryptoDataRouter);
app.use("/api", dataStatsRouter);
app.use("/api", standardDeviationRouter)
