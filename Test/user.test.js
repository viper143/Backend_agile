// use the path of your model
const User = require("../models/userModel");
const mongoose = require("mongoose");
// use the new name of the database
const url = "mongodb://127.0.0.1:27017/testFunbook";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("user Schema test anything", () => {
  //the code below is for insert testing
  it("Add user testing anything", () => {
    const user = {
      username: "hello",
      address: "kathmandu",
      password: "ktm123",
      email_address: "agokarna153@gmail.com",
    };
    return User.create(user).then((pro_ret) => {});
  });
  
  // he code below is for delete testing
  it('to test the delete product is working or not', async () => {
  const status = await User.deleteMany();
  });
  it('to test the update', async () => {
   return User.findOneAndUpdate({_id :Object('621119f8c8a0947bea7867a5')},
  {$set : {username:'goku'}})
   .then((pp)=>{
      // expect(pp.username).toEqual('bb')
   });
  });
});
