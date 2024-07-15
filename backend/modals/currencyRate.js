const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
    coinName: { type: String, required: true },
    symbol: { type: String, required: true },
    currencySymbol: { type: String },
    type: { type: String },
    rateUsd: { type: Number, required: true },

}, { timestamps: true })


const CurrencyRateInfo = mongoose.model("CurrencyRateInfo", rateSchema);

module.exports = CurrencyRateInfo
