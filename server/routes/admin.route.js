const express = require("express");
const {
  createTeam,
  getAllTeamsInfo,
  updateTeamInfo,
  getTeamInfo,
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
  deleteTeam,
  getAllAvailablePlayers,
  assignMatchesToTournament,
  getAllMatchesOfTournament,
  getMatch,
  updateMatchInfo,
  deleteMatch,
  getMatchesFilterByStatus,
  createMatch,
  togglePlayerRoleInTeam,
  assignMainPlayerRole,
  deleteTeamInTournament,
  getAllUsers,
} = require("../controller/admin.controller");
const {
  adminLoginValidation,
  createTeamValidation,
  createPlayerValidation,
  createTournamentValidation,
} = require("../middleware/validation");
const isAuthenticated = require("../middleware/auth");
const upload = require("../middleware/multer");
const router = express.Router();

router.post("/register", adminLoginValidation(), adminRegister);

// Protected Routes
router.use(isAuthenticated);
router.get("/logout", logout);

// all users
router.get("/users", getAllUsers);

// Teams Route
router
  .post("/team", upload.single("logo"), createTeamValidation(), createTeam)
  .get("/team", teamBelongsToTournament);
router.get("/teams", getAllTeamsInfo);
router
  .get("/team/:teamId", getTeamInfo)
  .put("/team/:teamId", updateTeamInfo)
  .delete("/team", deleteTeam);
router.put("/team/assign/main-players", assignMainPlayerRole);
router.put("/team/player/role", togglePlayerRoleInTeam);

// Players routes
router
  .post("/player", createPlayerValidation(), createPlayer)
  .delete("/player", deletePlayer);
router
  .get("/players", fetchAllPlayers)
  .get("/players/available", getAllAvailablePlayers);
router.get("/players", fetchAllPlayers);
router.get("/players/available", getAllAvailablePlayers);
router.post("/assign-player", assignPlayerToTeam);
router.get("/player/:playerId", getPlayerInfo);

// Tournament routes
router
  .post("/tournament", createTournamentValidation(), createTournament)
  .delete("/tournament", deleteTournament);
router.get("/tournament/:tournamentId", tournamentInfo); // fetch only 1
router.get("/tournament/matches/:tournamentId", getAllMatchesOfTournament);
router.get("/tournaments", getAllTournament); // fetch all
router
  .get("/tournament/team/:tournamentId", getTeamInfoOfTournament)
  .post("/tournament/team", addTeamInTournament)
  .put("/tournament/team/:tournamentId", deleteTeamInTournament); // expect `tournamentId` as query param

// Matches
router.post("/match/assign", assignMatchesToTournament); // for random
router.post("/match/create", createMatch);
router.get("/match/:matchId", getMatch);
router.put("/match/:matchId", updateMatchInfo);
router.delete("/match/:matchId", deleteMatch);
router.get("/match", getMatchesFilterByStatus);

module.exports = router;
