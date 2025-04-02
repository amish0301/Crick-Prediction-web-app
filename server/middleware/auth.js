const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const db = require("../models");

const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return next(new ApiError(401, "Token Not Found"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await db.User.findByPk(decoded.id);
      if (!user) {
        return next(new ApiError(404, "User Not Found"));
      }

      req.uId = user.id;
      next();
    } catch (error) {
      return next(new ApiError(401, "Invalid Token or Expired"));
    }
  } catch (error) {
    return next(new ApiError(500, "Something went Wrong in AuthMiddleware"));
  }
};

module.exports = isAuthenticated;
