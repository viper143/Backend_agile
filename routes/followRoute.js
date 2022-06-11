const express = require("express");
const followRoute = new express.Router();
const auth = require("../auth/auth");
const followModel = require("../models/followModel");

// follow or following friends code start here
followRoute.post("/user/follow-friends", auth.verifyUser, (req, res) => {
  try {
    const followFollowing = new followModel({
      follower: req.userInfo._id,
      following: req.body.following,
    });
    followFollowing
      .save()
      .then(() => {
        res.status(200).json({ message: "success", type: "success" });
      })
      .catch((e) => {
        res.status(500).json({ e });
      });
  } catch (e) {
    res.json({ message: e });
  }
});

// follow or following friends code end here

// getting all the followers and following users code start here
followRoute.get("/user/get-followers", (req, res) => {
  const getFollowData = followModel.find({ following: req.body.followingId });
  res.json(getFollowData);
});
// getting all the followers and following users code end here

followRoute.get("/follower/:userId", (req, res)=>{
  const userId = req.params.userId
  followModel.find({following: userId}).then((result)=>{
    res.json(result)
  }).catch((erros)=>{
    res.json(erros)
  })
})


module.exports = followRoute;
