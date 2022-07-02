const mongoose = require('mongoose');
const notificationModel = require("../models/notificationModel.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})


describe("to check the notification", () => {
    it("can user get notified", async () => {
      // we will write this function next
      
    //   sliderImage:"user.png"
      

    })
  });