const mongoose = require("mongoose")

const Notification = mongoose.model("Notification", {
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }, 
    type: {type: String},
    notification_by:{
        type: mongoose.Schema.Types.ObjectId, ref: "User",
    },
    notification :{type: String }
})

module.exports = Notification;


