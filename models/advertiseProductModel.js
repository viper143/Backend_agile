const mongoose = require("mongoose");

const AdvertiseProduct = mongoose.model("AdvertiseProduct", {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    date:{ type: Date},
    advphoto: { type: String, required: true},
    pname: { type: String, required: true},
    plink: { type: String, required: true}
})

module.exports = AdvertiseProduct;


