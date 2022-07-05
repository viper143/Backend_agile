const message = require("../models/messageModel")
const room = require("../models/messageRoom")
exports.sendMessage = async (req, res) => {
    const messageData = req.body
    const rooms = await room.find({ users: [messageData.sentBy, messageData.sentTo] })
    console.log(rooms)
    if (rooms) {
        console.log(rooms)
    } else {
        const newRoom = new room({
            user1: req.body.owner,
            user2: req.userInfo._id,
            property: req.body
        })
    }
}
exports.createRoom = async (req, res) => {
    var data = req.body
    const creater = req.userInfo._id
    data.creater = creater
    const room_ = await room.findOne({ user: req.body.user, creater: creater })
    if (!room_) {
        const create = new room(data)
        create.save()
        res.json({ roomId: create._id, message: "Room Created", success: true })
    } else {
        res.json({ roomId: room_._id, message: "Room exists", success: true })
    }
}
exports.getRooms = async (req, res) => {
    const rooms = await room.find({
        "$or": [
            { creater: req.userInfo._id },
            { user: req.userInfo._id }
        ]
    }).populate('property').populate('user').populate('creater')
    res.json({ message: "rooms found", success: true, rooms: rooms })
}
exports.getRoom = async (req, res) => {
    const room_ = await room.findById({ _id: req.params.roomId }).populate('property').populate('user').populate('creater')
    res.json({ message: "room found", success: true, room: room_ })
}
exports.loadMessages = async (req, res) => {
    const messages = await message.find({ room: req.params.roomId })
    res.json({ messages })
}