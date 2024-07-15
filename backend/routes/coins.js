const express = require(`express`)
const CurrencyRateInfo = require("../modals/currencyRate")
const CurrencyInfo = require("../modals/Currency")
const coinRouter = express.Router()

coinRouter.get('/assets/:coinName', async (req, res) => {
    try {
        console.log(req.params)
        const coinQuery = {}
        if (req.params.coinName!=="all") {
            coinQuery.id = req.params.coinName
        }
        console.log("coinQuery =", coinQuery, req.params)
        const getMyCoins = await CurrencyInfo.find({ ...coinQuery }).sort({ id: 1 });
        console.log("getMyCoins", getMyCoins)
        if (getMyCoins.length) {
            return res.status(200).json({
                status: "success",
                message: 'fetched coins available successfully!',
                data: getMyCoins
            })
        }
        return res.status(400).send({
            status: "failure",
            message: 'currency coin not found'
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            status: "failure",
            message: 'currency coin not found'
        })
    }
})


coinRouter.get('/rates/:coinName', async (req, res) => {
    try {
        console.log(req.params)
        const getMyRates = await CurrencyRateInfo.find({ coinName: req.params.coinName }).sort({ createdAt: -1 }).limit(20);
        // console.log("getMyRates", getMyRates)
        if (getMyRates) {
            res.status(200).json({
                status: "success",
                message: 'got rates successfully!',
                data: getMyRates
            })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "failure",
            message: 'currency not found'
        })
    }
})


module.exports = coinRouter;
