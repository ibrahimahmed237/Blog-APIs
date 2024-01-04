const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");
const User = require("../models/User");
const authController = require("../controllers/auth");

describe("Auth Controller - Login", async function () {
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
    sinon.stub(User, "findOne");
    User.findOne = sinon.stub().returns(undefined);

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
  });
});
