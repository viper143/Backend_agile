const mongoose = require("mongoose");

const User = mongoose.model("User", {
    date : {type: String},
    firstname: {type: String },
    lastname :{type: String},
    email_address: {type: String,required: true},
    address: {type: String },
    username: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String, default: "./funbook_images/default_avatar.png"},
});

module.exports = User;
