const mongoose = require('mongoose');

const Follow = mongoose.model("Follow", {
    follower: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    following: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

module.exports = Follow;


