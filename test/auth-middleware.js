const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const authMiddleware = require("../middlewares/is-auth.js");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

describe("Auth middleware", function () {
  it("should throw an error if no authorization header is present", async function () {
    const req = {
      header: function () {
        return null;
      },
    };
    const next = sinon.spy();

    await authMiddleware(req, {}, next);
    const firstCall = next.getCall(0);
    expect(firstCall).to.exist;
    expect(firstCall.args[0]).to.be.an.instanceof(Error);
    expect(firstCall.args[0].message).to.equal("Not authenticated!");
  });

  it("should throw an error if the authorization header is only one string", async function () {
    const req = {
      header: function () {
        return "auth";
      },
    };
    const next = sinon.spy();

    await authMiddleware(req, {}, next);
    const firstCall = next.getCall(0);
    expect(firstCall).to.exist;
    expect(firstCall.args[0]).to.be.an.instanceof(Error);
    expect(firstCall.args[0].message).to.equal("jwt malformed");
  });
  it("should yield userId after decoding the token", async function () {
    const req = {
      header: function () {
        return "Bearer validtoken";
      },
    };
    const next = sinon.spy();
    jwt.verify = sinon.stub().returns({ userId: "abc" });
    User.findOne = sinon.stub().returns({ _id: "abc" });
    await authMiddleware(req, {}, next);
    expect(req).to.have.property("userId", "abc");
    expect(User.findOne.called).to.be.true;
    expect(jwt.verify.called).to.be.true;
    expect(next.called).to.be.true;
  });
});
