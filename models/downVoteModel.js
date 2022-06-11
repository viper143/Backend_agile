const mongoose = require('mongoose');

const DownVote = mongoose.model("DownVote", {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

module.exports = DownVote;

