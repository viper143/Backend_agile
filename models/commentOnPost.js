const mongoose = require('mongoose');

const CommentOnPost = mongoose.model("CommentOnPost",{
    post: {type: mongoose.Schema.Types.ObjectId, ref: "PhotoQuotes"},
    user:{ type:mongoose.Schema.Types.ObjectId, ref: "User"},
    comment: { type: String}
})

module.exports =  CommentOnPost;

