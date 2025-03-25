const express = require("express");
const {
  createTeam,
  getAllTeamsInfo,
  updateTeamInfo,
  getTeamInfo,
  deleteTeam,
  adminRegister,
  createPlayer,
  getPlayerInfo,
  assignPlayerToTeam,
  getTeamInfoOfTournament,
  createTournament,
  logout,
} = require("../controller/admin.controller");
const {
  adminLoginValidation,
  createTeamValidation,
  createPlayerValidation,
  createTournamentValidation,
} = require("../middleware/validation");
const isAuthenticated = require("../middleware/auth");
const router = express.Router();

router.post('/register',adminLoginValidation(), adminRegister)

// Protected Routes
router.use(isAuthenticated);
router.get('/logout', logout);

// Teams Route
router.post("/team", createTeamValidation(), createTeam);
router.get("/teams", getAllTeamsInfo);
router
  .get("/team/:teamId", getTeamInfo)
  .put("/team", updateTeamInfo)
  .delete("/team", deleteTeam);

// Players routes
router.post("/player", createPlayerValidation(), createPlayer);
router.post('/assign-player', assignPlayerToTeam);

router.get("/player/:playerId", getPlayerInfo);

// Tournament routes
router.post("/tournament", createTournamentValidation(), createTournament);
router.get('/tournament/team', getTeamInfoOfTournament);    // expect `tournamentId` as query param

module.exports = router;
