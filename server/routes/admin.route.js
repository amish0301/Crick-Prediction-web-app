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
  fetchAllPlayers,
  deletePlayer,
  deleteTournament,
  addTeamInTournament,
  teamBelongsToTournament,
  tournamentInfo,
  getAllTournament,
  updatePlayerInfo,
  getAllNonAssignedPlayers,
} = require("../controller/admin.controller");
const {
  adminLoginValidation,
  createTeamValidation,
  createPlayerValidation,
  createTournamentValidation,
} = require("../middleware/validation");
const isAuthenticated = require("../middleware/auth");
const router = express.Router();

router.post("/register", adminLoginValidation(), adminRegister);

// Protected Routes
router.use(isAuthenticated);
router.get("/logout", logout);

// Teams Route
router
  .post("/team", createTeamValidation(), createTeam)
  .get("/team", teamBelongsToTournament);
router.get("/teams", getAllTeamsInfo);
router
  .get("/team/:teamId", getTeamInfo)
  .put("/team", updateTeamInfo)
  .delete("/team", deleteTeam);

// Players routes
router
  .post("/player", createPlayerValidation(), createPlayer)
  .delete("/player", deletePlayer);
router.get("/players", fetchAllPlayers).get('/players/available', getAllNonAssignedPlayers);
router.post("/assign-player", assignPlayerToTeam);

router.get("/player/:playerId", getPlayerInfo);

// Tournament routes
router
  .post("/tournament", createTournamentValidation(), createTournament)
  .delete("/tournament", deleteTournament);
router.get("/tournament/:tournamentId", tournamentInfo); // fetch only 1
router.get("/tournaments", getAllTournament); // fetch all
router
  .get("/tournament/team", getTeamInfoOfTournament)
  .post("/tournament/team", addTeamInTournament); // expect `tournamentId` as query param

module.exports = router;
