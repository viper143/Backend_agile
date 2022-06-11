const express = require("express");
const commentRouter = express.Router();
const Comments = require("../models/commentOnPost");
const auth = require('../auth/auth')
commentRouter.post("/comment/postcomment",auth.verifyUser, async (req, res) => {
  try {
    const postComment = await new Comments({
      user:req.userInfo._id,
      post: req.body.postid,
      comment :req.body.comment
    });
    postComment.save();
    res.json({ message: "success" });
    console.log(req.body.postid);
    console.log(req.body.comment);
  } catch (e) {
    res.json("Error is occurred due to " + e);
  }
});

commentRouter.get("/comments/get/:postid",function(req, res){
  // console.log("lOLS"+req.params.postid);
  Comments.find({post:req.params.postid}).populate('user').then(function(data){
    console.log(data);
    res.json({comment: data});
  })
})



module.exports = commentRouter;
