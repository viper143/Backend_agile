const mongoose = require('mongoose');
const messageRoom = require("../models/messageRoom.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})


describe("to check the rooms created for message or not", () => {
    it("is the room created", () => {
      // we will write this function next
      
      sliderImage:"user.png"
      

    })
  });