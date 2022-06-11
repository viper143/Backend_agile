const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const upload = require("../uploads/uploads");
const userRouter = new express.Router();
const User = require("../models/userModel");
const { type } = require("express/lib/response");
const notification = require("../models/notificationModel")
const Addfriend = require('../models/addFriendModel')
const userModel = require('../models/userModel')

// route for customer registration
userRouter.post(
  "/user/registration",
  // upload.single("image"),
  (req, res) => {
    const email_address = req.body.email_address;
    const username = req.body.username;
    const password = req.body.password;
    // const repassword = req.body.repassword;
    // const firstname = req.body.firstname;
    // const lastname = req.body.lastname;
    // const address = req.body.address;
    User.findOne({ username: username, email_address: email_address })
      .then((userData) => {
        if (userData != null) {
          res.json({
            message: "User Already Exists! Try another username",
            type: "error",
          });
          return;
        }
        if (userData != null) {
          res.json({
            message: "Email Address Already Used! Try Another Email Address",
            type: "error",
          });
          return;
        }
        // if (password != repassword) {
        //     res.json({ message: "Sorry, Password didn't Match!!!" });
        // }
        else {
          bcryptjs.hash(password, 10, (e, hashed_password) => {
            const userDetail = new User({
              date: new Date().toDateString(),
              email_address: email_address,
              username: username,
              password: hashed_password,
            });
            userDetail.save()
              .then((result) => {
                res.status(200).json({
                  message: "Your account has been created successfully",
                  type: "success",
                });
              })
              .catch((e) => {
                res.json({
                  message:
                    "Something went wrong while creating an account!" + e,
                  type: "error",
                });
              });
          });
        }
      })
      .catch((e) => {
        res.json({ message: "Error occurred due to: " + e });
      });
  }
);

// notification
userRouter.get("/notification", auth.verifyUser, function (req, res) {
  notification.find({ user: req.userInfo._id }).then(function (notifications) {
    // notification.find({user: req.userInfo}).then(function(notifications){
    // console.log(notifications);
    res.json({ notifications: notifications });
  });
});


// login route - for user
userRouter.post("/user/login_form", (req, res) => {
  const email = req.body.email;
  console.log(email)
  User.findOne({ email_address: email })
    .then(function (userData) {
      console.log(userData)
      if (userData === null) {
        res.json({ message: "Invalid Credentials!", type: "error" });
      }
      // need to check password
      const password = req.body.password;
      bcryptjs.compare(password, userData.password, (e, result) => {
        if (result) {
          // ticket generate - jsonwebtoken
          const token = jwt.sign(
            { cusId: userData._id, username: userData.username, user: userData },
            "anysecretkey"
          );
          res.json({
            token: token,
            username: userData.username,
            message: "Successfully logged in",
            type: "success",
          });
        } else {
          res.json({
            message: "Invalid Credentials!",
            type: "error",
          });
        }
      });
    })
    .catch((e) => {
      return res.json({ message: "Error Occurred due to " + e });
    });
});

// user deletion code here
userRouter.delete("/user/delete/:id", auth.verifyUser, (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "User has been deleted successfully" });
    })
    .catch(() => {
      res.json({ message: "Something went wrong" });
    });
});

// picture upload
userRouter.post(
  "/user/profile_image",
  upload.single("profile_image"),
  (req, res) => {
    // if file format is incorrect
    if (req.file == undefined) {
      return res.json({
        message: "Invalid file format. Only images files",
      });
    }
    // code after success
    else {
      return true;
    }
  }
);

// updation code here
userRouter.put("/user/update/:id", upload.single('image'), auth.verifyUser, (req, res) => {
  const id = req.body.userId;
  console.log(id);
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const address = req.body.address;
  const image = req.file.path;
  User.findOneAndUpdate(
    { _id: id },
    {
      username: username,
      firstname: firstname,
      lastname: lastname,
      address: address,
      image: image,
    }
  ).then((val) => {
    res.json(val)
    // console.log(val);
  })
});

// logout
userRouter.get("/user/logout", function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/login");
      }
    });
  }
});

// getting users
userRouter.get("/user/get_users/:userId", (req, res) => {
  const userId = req.params.userId
  User.findOne({ _id: userId })
    .then((userData) => {
      res.json({ user: userData });
    })
    .catch((error) => {
      res.json({ message: "Error occurred due to " + error });
    });
});


// get all users

userRouter.get('/all-user', (req, res) => {
  User.find().then(data => {
    res.json(data)
  })
})

userRouter.get('/profile/:id', async (req, res) => {
  const profile = await User.findOne({ _id: req.params.id })
  if (!profile) {
    res.json({ message: "user not found" })
  } else {
    res.json({ profile })
  }
})

// add friend
// userRouter.post('/add-friend',(req,res)=>{
//   console.log(req.body)
//   new Addfriend({ user1:req.body.user1, user2:req.body.user2}).save().then(res=>{
//     console.log(res)
//     res.json(res)
//   }).catch(e=>{
//     res.json(e)
//   })
// })
// 
// userRouter.get('/request',(req,res)=>{
//   Addfriend.find({ user2:req.body.user}).then(res=>{
//     res.json(res)
//   })
// })

// accept request friend
// userRouter.put('/accept-friend',(req,res)=>{
//   // console.log(req.body)
//    Addfriend.findOneAndUpdate({ user1:req.body.user1, user2:req.body.user2 },{ isAccept:req.body.isAccept}).then(res=>{
//     console.log(res)
//     res.json(res)
//   }).catch(e=>{
//     res.json(e)
//   })
// })

userRouter.put('/update-password', auth.verifyUser, async(req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const conPassword = req.body.conPassword;
  if (newPassword !== conPassword) {
    return res.json({ message: "Password Did Not Match!", success: false });
  }

  const user_ = await userModel.findById(req.userInfo._id);

  bcryptjs.compare(oldPassword, user_.password, function (e, result) {

    //if true correct password else incorrect
    if (result === false) {
      return res.json({ message: "Invalid Password!", success: false });
    }

    //let update password
    else {
      bcryptjs.hash(newPassword, 10, function (e, hashed_pw) {
        userModel
          .findByIdAndUpdate(req.userInfo._id, { password: hashed_pw })
          .then(function (err, docs) {
            return res.json({ message: "Password Updated!", success: true });
          });
      });
    }
  });
})

module.exports = userRouter;
