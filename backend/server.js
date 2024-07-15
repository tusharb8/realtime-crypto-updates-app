const mongoose = require(`mongoose`)
const express = require(`express`)
const app = express()
const cors = require(`cors`)

require('dotenv').config()
app.use(cors({ origin: "*" }))
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
const connectDB = require(`./connection/connect`)
const coinRouter = require('./routes/coins')
const { default: axios } = require('axios')
const CurrencyRateInfo = require('./modals/currencyRate')
const { Server } = require("socket.io");

const coinSocketMap = {
    "ethereum": {}, "bitcoin": {}, "litecoin": {}, "dogecoin": {}, "bitcoin-cash": {}, "tether": {}
}
const app_client = express();
const httpServer_client = require("http").createServer(app_client);
const options = {
    cors: {
        origins: ["*"],
    },
};
const ioWebClient = new Server(httpServer_client, options)

ioWebClient.on("connection", (socket) => {

    let selectedCoin = "myroom"
    // coinSocketMap[selectedCoin][socket.id] = 1
    ioWebClient
        .in(selectedCoin)
        .fetchSockets()
        .then((allSockets) => {
            console.log(`ioWebClient.in(${selectedCoin})`, allSockets.length);
        });

    socket.join(selectedCoin);

    socket.on("connect", (data) => {
        console.log("client with socket id:", socket.id, "connected")
    })

    socket.on("setCoinSelected", async (data) => {
        // delete coinSocketMap[selectedCoin][socket.id]
        await socket.leave(selectedCoin)
        console.log("setCoinSelected", socket.id, data)

        selectedCoin = data
        await socket.join(selectedCoin)
        // coinSocketMap[selectedCoin][socket.id] = 1
        // console.log("coinSocketMap",coinSocketMap)

        ioWebClient
            .in(selectedCoin)
            .fetchSockets()
            .then((allSockets) => {
                console.log(`ioWebClient.in(${selectedCoin})`, allSockets.length);
            });
    })

    socket.on("disconnect", async (reason) => {
        // delete coinSocketMap[selectedCoin][socket.id]
        await socket.leave(selectedCoin)
        console.log("client disconnected:", reason);
    });
})


console.log("CurrencyRateInfo", CurrencyRateInfo)
// const Rate = require("./connection/schema")
const PORT = 5000
const availableCoins = ["ethereum", "bitcoin", "litecoin", "dogecoin", "bitcoin-cash", "tether"]
app.get("/", (req, res) => {
    res.send("Welcome")
})
let intervalId = null
const startGatheringData = async () => {

    const isConnected = await connectDB();

    intervalId = setInterval(async () => {
        try {
            const allCoinPromisses = availableCoins.map(async (coinName) => {
                const getCoinRate = await axios(`https://api.coincap.io/v2/rates/${coinName}`,
                    {
                        method: "GET",
                    }).catch(error => {
                        console.error(error);
                        return false
                    });

                // console.log(coinName, getCoinRate.data);
                const newRate = new CurrencyRateInfo()
                newRate.coinName = getCoinRate.data.data.id
                newRate.symbol = getCoinRate.data.data.symbol
                newRate.currencySymbol = getCoinRate.data.data.currencySymbol ? getCoinRate.data.currencySymbol : ""
                newRate.type = getCoinRate.data.data.type
                newRate.rateUsd = getCoinRate.data.data.rateUsd

                // console.log("newRate",newRate)
                const newRateSaved = await newRate.save()
                ioWebClient.to(newRate.coinName).emit("coin-data-updated",newRateSaved)
                return true
            })
            // console.log("allCoinPromisses", allCoinPromisses)
            const allPromissesResolved = await Promise.all(allCoinPromisses);
            // console.log("allPromissesResolved", allPromissesResolved)
            const wereAllCoinDataSuccesfull = allPromissesResolved.every(stat => { return stat })
            // console.log("wereAllCoinDataSuccesfull", wereAllCoinDataSuccesfull)
        }
        catch (error) {
            console.log(error)
        }
    }, 5000);
}
startGatheringData()
app.all("/*", (req, res, next) => {
    console.log(req.url)
    next()
})
app.use("/api/coins", coinRouter);

app.listen(PORT, () => {
    try {
        console.log('connected to server')
    } catch (error) {
        console.log(error)
    }
})

httpServer_client.listen(PORT + 1, () => {
    try {
        console.log('socket server started at', PORT + 1)
    } catch (error) {
        console.log(error)
    }
})