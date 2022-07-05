const mongoose = require('mongoose')



const message = mongoose.model("Message", {

    sentBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},

    sentTo: {type: mongoose.Schema.Types.ObjectId, ref: "User"},

    room: {type: mongoose.Schema.Types.ObjectId, ref: "Room"},

    message: {type: String},

    image: {type: String},

    date: {type: Date},

    time: {type: String}

})



module.exports = message;