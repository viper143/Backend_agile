const express = require("express");
const auth = require("../auth/auth");
const upload = require("../uploads/uploads");
const photoQuotesRouter = express.Router();
const PhotoQuotes = require("../models/photoQuotesModel");
const User = require("../models/userModel");
const SaveToFavourite = require("../models/saveToFavourite");

photoQuotesRouter.post(
  "/both-photo-quotes/post-photo",
  auth.verifyUser,
  upload.single("images"),
  (req, res) => {
    try {
      // const date = new Date().toLocaleDateString();
      const photoquotes = new PhotoQuotes({
        user: req.userInfo._id,
        date: new Date().toDateString(),
        photoquotes: req.body.photoquotes,
        // photo: req.body.photo,
        photo: req.file.path,
      });
      photoquotes
        .save()
        .then(() => {
          res.json({
            message: "Your post has been posted successfully",
            type: "success"
          })
        })
        .catch(() => {
          res.json({ message: "Something went wrong", type: "error" });
        });
    } catch (e) {
      res.json({ message: "sorry, you got an error Try Again!!!" });
    }
  }
);

photoQuotesRouter.put(
  "/post-image/:id",
  auth.verifyUser,
  upload.single("photo"),
  (req, res) => {
    const id = req.params.id;
    PhotoQuotes.findOneAndUpdate(
      { _id: id },
      {
        photo: req.file.path,
      }
    )
      .then((result) => {
        res.status(201).json(result);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

// updation code here
photoQuotesRouter.put(
  "/both_photo_quotes/update/:id",
  auth.verifyUser,
  upload.single("images"),
  (req, res) => {
    const id = req.params.id;
    const quotes = req.body.photoquotes;
    const photo = req.file.path;
    PhotoQuotes.findOneAndUpdate(
      { _id: id },
      {
        photoquotes: quotes,
        photo: photo,
      }
    )
      .then((e) => {
        res.json({
          message: "Your post has been successfully updated",
          type: "success",
        });
      })
      .catch(() => {
        res.json({
          message: "Something went wrong while updating the post",
          type: "error",
        });
      });
  }
);

// deletion code here
photoQuotesRouter.delete(
  "/both_quotes_photo/delete/:deleteid",
  auth.verifyUser,
  (req, res) => {
    const id = req.params.deleteid;
    PhotoQuotes.findOneAndDelete({ _id: id, user: req.userInfo._id })
      .then(() => {
        res.json({
          message: "Your post has been successfully deleted",
          type: "success",
        });
      })
      .catch(() => {
        res.json({ message: "Something went wrong while deleting the post" });
      });
  }
);

// phot.post("/comment/post", async (req, res) => {
//   try {
//     const comment = await new Comment({
//       text: req.body.comment,
//       blog: req.body.blogid,
//     }).save();
//     res.status(200).json(comment);
//   } catch (error) {}
// });

photoQuotesRouter.get("/post/show-posts-details", (req, res) => {
  PhotoQuotes.find()
    .populate("user")
    .then((result) => {
      res.json(result);
      console.log(result)
    })
    .catch(() => {
      res.json({ message: "Error Occurred" });
    });
});
photoQuotesRouter.get("/post/show-my-posts", auth.verifyUser, (req, res) => {
  PhotoQuotes.find({user: req.userInfo._id})
    .populate("user")
    .then((result) => {
      res.json(result);
      console.log(result)
    })
    .catch(() => {
      res.json({ message: "Error Occurred" });
    });
});

//
photoQuotesRouter.get("/post/details/:id", (req, res) => {
  const id = req.params.id;
  PhotoQuotes.findOne({ _id: id })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ message: "Error Occurred" });
    });
});

photoQuotesRouter.put("/like-post", auth.verifyUser, async (req, res) => {
  const post = await PhotoQuotes.findById(req.body.postId)
  const likes = post.likes
  const likedBy = post.likedBy

  const likedUser = likedBy.indexOf(req.userInfo._id)
  if (req.body.liked) {
    likedBy.push(req.userInfo._id)
    PhotoQuotes.findByIdAndUpdate(post._id, { likes: likes + 1, likedBy: likedBy }, function (err, docs) {
      if (!err) {
        console.log("Updated")
      }
      res.json({ likes: likes + 1 })
    })
  } else {
    if (likedUser !== -1) {
      likedBy.splice(likedUser, 1)
    }
    PhotoQuotes.findByIdAndUpdate(post._id, { likes: likes - 1, likedBy: likedBy }, function (err, docs) {
      if (!err) {
        console.log("Updated")
      }
      res.json({ likes: likes - 1 })
    })
  }
})



module.exports = photoQuotesRouter;
