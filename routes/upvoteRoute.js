const express = require('express');
const upVoteRoute = express.Router();
const upVote = require("../models/voteModel");
const auth = require("../auth/auth")

// insertion code here
upVoteRoute.post("/up_vote/post", auth.verifyUser, (req, res) => {
    try {
        const upvote = new upVote({
            user: req.userInfo._id,
        })
        upvote.save()
            .then((value) => {
                res.json({ message: value })
            }).catch((e) => {
                res.json({ message: e })
            })
    }
    catch (e) {
        res.json({ message: "Error occured due to " + e })
    }
})

module.exports = upVoteRoute;