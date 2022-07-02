const mongoose = require("mongoose");

const Addfriend = mongoose.model("Addfriend", {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    isAccepted:{ type:Boolean, default: false}
})

module.exports = Addfriend;


