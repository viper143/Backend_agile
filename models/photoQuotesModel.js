const mongoose = require('mongoose');

const PhotoQuotes = mongoose.model("PhotoQuotes", {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    date: { type: String},
    photoquotes: { type: String},
    photo: { type: String},
    likes: {type: Number, default: 0},
    likedBy: {type: []}
})

module.exports = PhotoQuotes;

