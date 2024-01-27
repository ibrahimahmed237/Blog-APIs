// const expect = require("chai").expect;
// const chai = require("chai");
// const sinon = require("sinon");
// const mongoose = require("mongoose");
// const User = require("../models/User");
// const Post= require("../models/Post");
// const feedController = require("../controllers/feed");
// const app = require("../app");
// const chaiHttp = require("chai-http");
// const fs=require("fs");
// chai.use(chaiHttp);
// describe("Feed Controller", async function () {
//   let user, token;
//   before(async function () {
//     await mongoose.connect("mongodb://localhost:27017/social-network-test");
//     user = new User({
//       email: "ib@gmail.com",
//       password: "12345678",
//       name: "ibrahim",
//       posts: [],
//     });
//     try {
//       await user.save();
//       token = await user.generateAuthToken();
//     } catch (err) {
//       console.log(err);
//     }
//   });
//   it("should add the post to the posts of the creator", async function () {
  
//     const response = await chai
//       .request(app)
//       .post("/feed/post")
//       .set("Authorization", "Bearer " + token)
//       .set("Content-Type", "application/x-www-form-urlencoded")
//       .field("title", "tesfffft")
//       .field("content", "test344343")
//       .attach("image", fs.readFileSync("test/test.jpg"), "test.jpg");

//       console.log(response.body);
//     expect(response).to.have.status(200);

//   });

//   after(async function () {
//     await User.deleteMany({});
//     await Post.deleteMany({});
//     await mongoose.disconnect();
//   });
// });
