const mongoose = require('mongoose');

const saveToFavourite = require("../models/saveToFavourite.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})


describe("to check the favourite post", () => {
    it("can the admin add the post to favourite", async () => {
      // we will write this function next
      
      
      

    })
  });