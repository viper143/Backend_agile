const mongoose = require('mongoose');

const downVoteModel = require("../models/downVoteModel.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})


describe("to check the dislike in post", () => {
    it("can the users dislike in post", async () => {
      // we will write this function next
      
      
      

    })
  });