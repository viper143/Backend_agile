const { json } = require("body-parser");
const express = require("express");
const app = express();
const FollowModel = require('./models/followModel')
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const message = require('./models/messageModel')
const room = require('./models/messageRoom')
// const Usermodel = require('./models/userModel')
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

require("./database/connection");

// models
const posts = require("./models/photoQuotesModel");

// post login and register system
const userRouter = require("./routes/userRoute");
app.use(userRouter);


// post photo + quotes
const PhotoQuotes = require("./routes/photoQuotesRoute");
app.use(PhotoQuotes);

// save to favourite
const saveToFavourite = require("./routes/saveToFavourite")
app.use(saveToFavourite);

// advertisement your product
const advertiseProduct = require("./routes/advertiseProductRoute")
app.use(advertiseProduct);

const friendRequests = require('./routes/friendRequests')
app.use(friendRequests)

const messageRoutes = require('./routes/messageRouter')
app.use(messageRoutes);

// notification code
const userModel = require("./models/userModel");

const Notification = require("./models/notificationModel");
// app.use()


// const Comments = require('./routes/comments');
// app.use(Comments);
const Comments = require("./models/commentOnPost");

const Follow = require("./models/followModel");

const Cmntroute = require('./routes/comments');
const upload = require("./uploads/uploadImg");
app.use(Cmntroute)
// for image
app.use("/home/funbook_images", express.static("funbook_images"));
app.use(Comments)
// using custom routes for socket.io connections
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "SET", "DELETE"],
  },
});

var onlineUsers = [];

function removeUser(id) {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== id);
}

function getUser(userId) {
  // return onlineUsers.find((user) => JSON.parse(user).userId === userId)
  const sockets = [];
  for (var i = 0; i <= onlineUsers.length; i++) {
    const data = onlineUsers[i];
    if (data) {
      const data_ = JSON.parse(data);
      // console.log(userId)
      // console.log(data_.userId)
      if (data_.userId === userId) {
        // console.log("found")
        sockets.push(data_.socketId);
      }
    }
  }
  return sockets;
}

io.on("connection", (socket) => {
  console.log("Cliend connected with id: " + socket.id);

  // Adding client to temporary array
  socket.on("addClient", (data) => {
    if (socket.id !== undefined) {
      data.socketId = socket.id;

      if (onlineUsers.indexOf(data) === -1) {
        onlineUsers.push(JSON.stringify(data));
        const uniqueChars = [...new Set(onlineUsers)];
        // console.log(onlineUsers)
        onlineUsers = [...uniqueChars].reverse().reverse();
        console.log(onlineUsers);
      }
    }
  });

  socket.on("comment", (data) => {
    try {
      const postComment = new Comments({
        user: data.user,
        post: data.post,
        comment: data.comment,
      });
      postComment.save();

      //   res.json({ message: "success" });
      posts
        .findById(postComment.post)
        .populate("user")
        .then(function (result) {
          // console.log(data);
          console.log(data.user._id);
          console.log(onlineUsers);
          // make notification object on mongodb
          userModel.findById(data.user).then(function (userData) {
            const postNotification = new Notification({
              user: result.user._id,
              type: "comment",
              notification_by: data.user,
              notification: `${userData.firstname} ${userData.lastname} commented on your post`,
            });
            // console.log(postNotification);
            postNotification.save();
            var sockets = getUser(result.user._id.toString());
            console.log(sockets);
            for (var i = 0; i <= sockets.length; i++) {
              io.to(sockets[i]).emit("notification", {
                notification: postNotification,
              });
            }
          });
        });

      console.log(postComment);
      sockets = getUser();
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('follow', (data) => {
    const follower = data.follower
    const following = data.following
    FollowModel({
      follower: follower,
      following: following
    }).save().then((val) => {
      // Follow.findById()
      userModel
        .findOne({ _id: following })
        .then(function (result) {
          // console.log(data);
          // console.log(data.user._id);
          // console.log(onlineUsers);
          // make notification object on mongodb
          Follow.findOne({ follower: follower }).then(function (userData) {
            const postNotification = new Notification({
              user: result._id,
              type: "Follow",
              notification_by: data.user,
              notification: `${result.firstname} ${result.lastname} Followed you`,
            });
            console.log(postNotification);
            postNotification.save();
            var sockets = getUser(result._id.toString());
            console.log(sockets);
            for (var i = 0; i <= sockets.length; i++) {
              io.to(sockets[i]).emit("notification", {
                notification: postNotification,
              });
            }
          });
        });

      // console.log(postComment);
      // sockets = getUser();
    })
  })

  socket.on("joinRoom", (data) => {

    socket.join(data.roomId)

    console.log("Client joined the room " + data.roomId)

  })


  socket.on("sendMessage", async (data) => {

    if (data.message) {

      const createMessage = new message(data)

      createMessage.save().then(function (message) {

        io.to(data.room).emit("receiveMessage", message)

      })

    }

  })



  socket.on("sendImage", async (req, data) => {

    console.log(data)

    upload.single("image")

  })

  app.post('/send-image', upload.single('image'), function (req, res) {

    var messageData = req.body

    messageData.image = req.file.path

    const createMessage = new message(messageData)

    createMessage.save().then(function (message) {

      io.to(messageData.room).emit("receiveMessage", message)

    })

    res.json({ success: true })

  })

});

server.listen(5000, () => {
  console.log("App is listening on Port 5000");
});
