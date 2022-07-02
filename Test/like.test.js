// use the path of your model

const mongoose = require("mongoose");
const voteModel = require("../models/voteModel.js");
// use the new name of the database
const url = "mongodb://localhost:27017/ApiTesting";

beforeAll(async()=>{
  await mongoose.connect(url, {
      
  })
});
afterAll(async()=>{
  await mongoose.connection.close();
})


describe("to check the likes", () => {
  it("can user like the post", async () => {
    // we will write this function next
    
    
    

  })
});