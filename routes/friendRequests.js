const express = require("express");
const { json } = require("express/lib/response");
const router = new express.Router();
const auth = require("../auth/auth");
const friendRquests = require('../models/addFriendModel')

router.post('/add-friend/:userId', auth.verifyUser, async (req, res) => {
    const sender = req.userInfo._id
    const receiver = req.params.userId

    console.log(receiver)
    console.log(req.userInfo._id.toString())
    const alreadyAdded = await friendRquests.findOne({ sender, receiver })

    if(receiver === req.userInfo._id.toString()){
        return res.json({ message: "Invalid Operation", success: false })
    }

    if (!alreadyAdded) {
        const add = new friendRquests({
            sender, receiver
        })
        add.save()
        res.json({ message: "Added", success: true })
    }else{
        res.json({ message: "Already Added", success: false })
    }
})

router.get('/friend-requests', auth.verifyUser, async(req, res)=>{
    const requests = await friendRquests.find({receiver: req.userInfo._id, isAccepted: false}).populate('sender')
    console.log(requests)
    res.json(requests)
})

router.put('/accept-request/:userId', auth.verifyUser, async(req, res)=>{
    friendRquests.findOneAndUpdate({sender: req.params.userId, receiver: req.userInfo._id}, {isAccepted: true}, function(err, docs){
        if(!err){
            console.log("Updated")
            res.json({message:"Friend request accepted", success: true})
        }else{
            res.json({message:"Failed to accept request", success: true})
        }
    })
})

router.get('/friends', auth.verifyUser, async(req, res)=>{
    const friends = await friendRquests.find({
        "$or": [{sender: req.userInfo._id}, {receiver: req.userInfo._id}], isAccepted: true
    }).populate('sender').populate('receiver')
    res.json(friends)
})

module.exports = router;