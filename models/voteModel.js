const mongoose = require('mongoose');

const Vote = mongoose.model('Vote', {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

module.exports = Vote;

