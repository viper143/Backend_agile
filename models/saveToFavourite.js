const mongoose = require('mongoose');

const SaveToFavourite = mongoose.model("SaveToFavourite", {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    photoQuote: { type: mongoose.Schema.Types.ObjectId, ref: "PhotoQuotes", unique: true}
});

module.exports = SaveToFavourite;

