const express = require("express");
const {
  adminLogin,
  createTeam,
  getAllTeamsInfo,
  updateTeamInfo,
  getTeamInfo,
  deleteTeam,
  adminRegister,
} = require("../controller/admin.controller");
const {
  adminLoginValidation,
  createTeamValidation,
} = require("../middleware/validation");
const isAuthenticated = require("../middleware/auth");
const router = express.Router();

router.post('/register',adminLoginValidation(), adminRegister )

// Protected Routes
router.use(isAuthenticated);

router.post("/login", adminLogin);

// Teams Route
router.post("/team", createTeamValidation(), createTeam);
router.get("/teams", getAllTeamsInfo);
router
  .get("/team/:teamId", getTeamInfo)
  .put("/", updateTeamInfo)
  .delete("/", deleteTeam);

// Tournament routes

module.exports = router;
