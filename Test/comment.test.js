const mongoose = require('mongoose');
const commentOnPost = require("../models/commentOnPost.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})


describe("to check the commment ", () => {
    it("can user comment in the post", async () => {
      // we will write this function next
      
     
      

    })
  });