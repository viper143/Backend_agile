const mongoose = require('mongoose');
const addFriendModel = require("../models/addFriendModel.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})


describe("to check the addedFriends", () => {
    it("can user add the friends", async () => {
      // we will write this function next
      
      sliderImage:"user.png"
      

    })
  });