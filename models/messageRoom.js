const mongoose = require('mongoose')



const room = mongoose.model("Room", {

    creater: {type: mongoose.Schema.Types.ObjectId, ref: "User"},

    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},

    property:  {type: mongoose.Types.ObjectId, ref: "Property"}

})

module.exports = room;