const db = require("../models");
const ApiError = require("../utils/ApiError");
const TryCatch = require("../utils/TryCatch");

const adminRegister = TryCatch(async (req, res, next) => {
  const { email, adminKey } = req.body;

  if (!adminKey) return next(new ApiError(404, "Please Provide Admin Key"));

  if (adminKey && adminKey !== process.env.ADMIN_SECRET.toString())
    return next(new ApiError(400, "Invalid Admin Key"));

  // returns number of updated rows
  const updatedUser = await db.user.update(
    { role: "admin" },
    { where: { email } }
  );

  if (updatedUser <= 0) return next(new ApiError(404, "User Not Found"));

  return res
    .status(200)
    .json({ success: true, message: "Admin Registered Successfully" });
});

const adminLogin = TryCatch(async (req, res, next) => {
  const { email, adminKey } = req.body;

  if (!adminKey) return next(new ApiError(400, "Please Provide Admin Key"));

  const user = await db.user.findOne({ where: { email } });
  if (!user) return next(new ApiError(404, "User Not Found"));

  if (user.role === "admin" || user.role === "super_admin") {
    if (adminKey !== process.env.ADMIN_SECRET) {
      return next(new ApiError(403, "Invalid Admin Key"));
    }
  }

  // update state
  const updatedUser = await db.user.update(
    { role: "admin" },
    { where: { email } }
  );

  if (updatedUser <= 0) return next(new ApiError(404, "User Not Found"));

  return res
    .status(200)
    .json({ success: true, message: "Admin Login Successfully" });
});

// Create Team
const createTeam = TryCatch(async (req, res, next) => {
  const { name, logo, totalPlayers, mainPlayers, matchesInfo } = req.teamData;

  const team = await db.team.create({
    name,
    logo,
    total_players: totalPlayers,
    main_players: mainPlayers,
    matches_info: matchesInfo,
  });

  if (!team) return next(new ApiError(500, "Something went wrong"));

  return res
    .status(200)
    .json({ success: true, message: `Team ${name} Created!`, team });
});

const getAllTeamsInfo = TryCatch(async (req, res, next) => {});

const getTeamInfo = TryCatch(async (req, res, next) => {});

const updateTeamInfo = TryCatch(async (req, res, next) => {});

const deleteTeam = TryCatch(async (req, res, next) => {});

module.exports = {
  adminLogin,
  adminRegister,
  createTeam,
  getAllTeamsInfo,
  getTeamInfo,
  updateTeamInfo,
  deleteTeam,
};
