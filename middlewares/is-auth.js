const jwt = require("jsonwebtoken");
const User = require("../models/User");
const appError = require("../controllers/error.js").appError;
const asyncHandler = require("express-async-handler");

module.exports = asyncHandler(async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
        return next(new appError("Not authenticated!", 401));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decodedToken) {
        return next(new appError("Not authenticated!", 401));
    }
    const user = await User.findOne({
        _id: decodedToken.userId,
        "tokens.token": token,
    });
    if (!user) {
        return next(new appError("Not authenticated!", 401));
    }
    req.userId = decodedToken.userId;
    next();
});
