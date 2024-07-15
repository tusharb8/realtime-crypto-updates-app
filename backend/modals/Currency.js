const mongoose = require(`mongoose`)

const CurrencySchema = new mongoose.Schema({
    rank: { type: String, required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true,unique:true },
    supply: { type: Number, required: true },
    maxSupply: { type: Number},
    marketCapUsd: { type: Number, required: true },
    volumeUsd24Hr: { type: Number, required: true },
    priceUsd: { type: Number, required: true },
    changePercent24Hr: { type: Number, required: true },
    vwap24Hr: { type: Number, required: true },

},{timestamps:true})

const CurrencyInfo = mongoose.model("CurrencyInfo", CurrencySchema);

module.exports = CurrencyInfo;
