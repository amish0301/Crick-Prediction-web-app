const express = require("express");
const {
  adminLogin,
  createTeam,
  getAllTeamsInfo,
  updateTeamInfo,
  getTeamInfo,
  deleteTeam,
} = require("../controller/admin.controller");
const {
  adminLoginValidation,
  createTeamValidation,
} = require("../middleware/validation");
const router = express.Router();

router.post("/login", adminLoginValidation(), adminLogin);

// Teams Route
router.post("/team", createTeamValidation(), createTeam);
router.get("/teams", getAllTeamsInfo);
router
  .get("/team/:teamId", getTeamInfo)
  .put("/", updateTeamInfo)
  .delete("/", deleteTeam);

// Tournament routes

module.exports = router;
