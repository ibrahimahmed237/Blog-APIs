const expect = require("chai").expect;
const chai = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");
const User = require("../models/User");
const authController = require("../controllers/auth");
const app = require("../app");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
describe("Auth Controller", async function () {
  let user, token;
  before(async function () {
    await mongoose.connect("mongodb://localhost:27017/social-network-test");
    user = new User({
      email: "ib@gmail.com",
      password: "12345678",
      name: "ibrahim",
      posts: [],
    });
    try {
      await user.save();
      token = await user.generateAuthToken();
    } catch (err) {
      console.log(err);
    }
  });

  it("should throw an error if accessing the database fails", async function () {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "ibrahim@gmail.com",
      },
    };
    const next = sinon.spy();
    await authController.login(req, {}, next);
    const firstCall = next.getCall(0);
    expect(firstCall).to.exist;
    expect(firstCall.args[0]).to.be.an.instanceof(Error);
    expect(firstCall.args[0].message).to.equal("Error");
    expect(next.called).to.be.true;
    User.findOne.restore();
  });

  it("should throw an error if email or password are invalid", async function () {
    let findOneStub = sinon.stub(User, "findOne").returns(undefined);

    const req = {
      body: {
        email: "ibrahim@gmail.com",
        password: "12345678",
      },
    };
    const next = sinon.spy();
    await authController.login(req, {}, next);
    const firstCall = next.getCall(0);
    expect(firstCall).to.exist;
    expect(firstCall.args[0]).to.be.an.instanceof(Error);
    expect(firstCall.args[0].message).to.equal("Invalid email or password!");
    expect(firstCall.args[0].statusCode).to.equal(401);
    expect(next.called).to.be.true;
    await User.findOne.restore();
    findOneStub.restore();
  });

  it("should return a response with a valid user status for an existing user", async function () {
    const response = await chai
      .request(app)
      .get("/auth/status")
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property("status", "I am new!");
  });

  after(async function () {
    await User.deleteMany({});
    await mongoose.disconnect();
  });
});
