const db = require("../models");
const ApiError = require("../utils/ApiError");
const TryCatch = require("../utils/TryCatch");

// Profile
const profileInfo = TryCatch(async (req, res, next) => {
  // fetch UserId
  const userId = req.uId || "328c0681-0c32-420a-bb88-4333253220c8";

  const user = await db.user.findByPk(userId);
  if (!user) return next(new ApiError(404, "User Doesn't Exist"));

  return res.status(200).json({ success: true, user });
});

module.exports = { profileInfo };
