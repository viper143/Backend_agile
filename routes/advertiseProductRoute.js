const express = require('express');
const { message } = require('statuses');
const auth = require("../auth/auth")
const advertiseRouter = express.Router();
const upload = require("../uploads/uploads");
const AdvertiseProduct = require("../models/advertiseProductModel")
const User = require('../models/userModel');
const { single } = require('../uploads/uploads');

advertiseRouter.post("/add/promote-product", auth.verifyUser, upload.single('advertise_image'), (req, res)=>{
    try{
        const Advertisement = new AdvertiseProduct({
            user: req.userInfo._id,
            date: new Date(Date.now()),
            advphoto: req.file?.path,
            pname:req.body.pname,
            plink: req.body.plink,
        })
        Advertisement.save().then(()=>{
            res.json({
                message: "Your advertise product posted successfully",
                type: "success",
              });
        }).catch(()=>{
            res.json({
                message: "Failed to post your product details",
                type: "error",
              });
        })
    }
    catch (e){
        res.json({ message: "sorry, you got an error Try Again!!!"});
    }
});


// get advertise product 
advertiseRouter.get("/get/promote-product", (req, res)=>{
    AdvertiseProduct.find().sort('-date')
    .then((result)=>{
        res.json(result);
    }).catch((error)=>{
        res.json(error);
    })
})

module.exports = advertiseRouter;