const mongoose = require("mongoose");
const sinon = require("sinon");
const { expect } = require("chai");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middlewares/is-auth");
describe("Auth Middleware", function () {
  let findOneStub;
  let verifyStub;
  let nextSpy;
  let userId;

  beforeEach(function () {
    // Create a valid ObjectId for the test
    userId = new mongoose.Types.ObjectId().toHexString();

    // Create the stubs and spy
    findOneStub = sinon.stub(User, "findOne").returns({ _id: userId });
    nextSpy = sinon.spy();
  });

  afterEach(function () {
    // Restore the stubs and spy
    findOneStub.restore();
    verifyStub.restore();
  });

  it("should yield userId after decoding the token", async function () {
    verifyStub = sinon.stub(jwt, "verify").returns({ userId });

    const req = {
      header: function () {
        return "Bearer validtoken";
      },
    };

    await authMiddleware(req, {}, nextSpy);

    expect(req).to.have.property("userId", userId);
    sinon.assert.calledWith(findOneStub, {
      _id: userId,
      "tokens.token": "validtoken",
    });
    sinon.assert.calledWith(verifyStub, "validtoken");
    sinon.assert.calledOnce(nextSpy);
  });

  it("should throw an error if no authorization header is present", async function () {
    const req = {
      header: function () {
        return null;
      },
    };

    await authMiddleware(req, {}, nextSpy);
    const firstCall = nextSpy.getCall(0);
    expect(firstCall).to.exist;
    expect(firstCall.args[0]).to.be.an.instanceof(Error);
    expect(firstCall.args[0].message).to.equal("Not authenticated!");
  });

  it("should throw an error if the authorization header is only one string", async function () {

    const req = {
      header: function () {
        return "invalidtoken";
      },
    };

    await authMiddleware(req, {}, nextSpy);
    const firstCall = nextSpy.getCall(0);
    expect(firstCall).to.exist;
    expect(firstCall.args[0]).to.be.an.instanceof(Error);
    expect(firstCall.args[0].message).to.equal("jwt malformed");
  });
});
