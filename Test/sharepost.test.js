const mongoose = require('mongoose');
const advertiseProductModel = require("../models/advertiseProductModel.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})


describe("to check the shared post", () => {
    it("can user share the post", async () => {
      // we will write this function next
      
      

    })
  });