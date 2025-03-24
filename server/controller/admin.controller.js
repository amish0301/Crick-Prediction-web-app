const db = require("../models");
const ApiError = require("../utils/ApiError");
const TryCatch = require("../utils/TryCatch");

const adminRegister = TryCatch(async (req, res, next) => {
  const { email, adminKey } = req.body;

  if (!adminKey) return next(new ApiError(404, "Please Provide Admin Key"));

  if (adminKey && adminKey !== process.env.ADMIN_SECRET)
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

// ******** Team *********
const createTeam = TryCatch(async (req, res, next) => {
  const { name, logo, mainPlayers, matchesInfo } = req.teamData;

  const team = await db.team.create({
    name,
    logo,
    main_players: mainPlayers,
    matches_info: matchesInfo,
  });

  if (!team)
    return next(new ApiError(500, "Team Creation Failed from Server Side"));

  return res
    .status(200)
    .json({ success: true, message: `Team ${name} Created!`, team });
});

const getAllTeamsInfo = TryCatch(async (req, res, next) => {
  const teams = await db.team.findAll();

  if (!teams) return next(new ApiError(404, "No Teams Found"));

  return res.status(200).json({ success: true, teams });
});

const getTeamInfo = TryCatch(async (req, res, next) => {
  const { teamId } = req.params;

  if (!teamId) return next(new ApiError(400, "Please Provide TeamId"));

  const team = await db.team.findByPk(teamId);
  if (!team) return next(new ApiError(404, "Team Doesn't Exist"));

  return res.status(200).json({ success: true, team });
});

const updateTeamInfo = TryCatch(async (req, res, next) => {
  const {teamId} = req.params;

  if(!teamId) return next(new ApiError(400, "Please Provide TeamId"));

  // get data which wanted to be updated
  const {name, logo, addedPlayers=[], removedPlayers=[]} = req.body;

  const team = await db.team.findOne({
    where: {team_id: teamId},
    attributes: ["team_id", "name", "logo", "main_players"],
  });

  if(!team) return next(new ApiError(404, "Team Not Found"));

  let currentPlayers = new Set(team.main_players || []);

  if(removedPlayers) {
    removedPlayers.forEach(playerId => currentPlayers.delete(playerId));
  }

  if(addedPlayers) {
    addedPlayers.forEach(playerId => currentPlayers.add(playerId));
  }

  const updatedPlayers = [...currentPlayers];
  

});

// DELETE
const deleteTeam = TryCatch(async (req, res, next) => {
  const { teamId } = req.query;

  if (!teamId) return next(new ApiError(400, "Please Provide TeamId"));

  const team = await db.team.destroy({ where: { team_id: teamId } });

  if (!team) return next(new ApiError(404, "Team Not Found"));

  return res
    .status(200)
    .json({ success: true, message: `Team Deleted Successfully` });
});

// ******* Players ********
const createPlayer = TryCatch(async (req, res, next) => {
  const { name, age, role } = req.playerData;

  const player = await db.player.create({
    name,
    age,
    position: role,
  });

  if (!player)
    return next(new ApiError(500, "Player Creation Failed from Server Side"));

  return res
    .status(200)
    .json({ success: true, message: `Player ${name} Created!`, player });
});

const getPlayerInfo = TryCatch(async (req, res, next) => {
  const { playerId } = req.params;

  if (!playerId) return next(new ApiError(400, "Please Provide PlayerId"));

  const player = await db.player.findByPk(playerId);
  if (!player) return next(new ApiError(404, "Player Not Found"));

  return res.status(200).json({ success: true, player });
});

const assignPlayerToTeam = TryCatch(async (req, res, next) => {
  const { teamId, playerId } = req.query;

  if (!teamId || !playerId)
    return next(new ApiError(400, "Please Provide TeamId and PlayerId"));

  const player = await db.player.findByPk(playerId);
  if (!player) return next(new ApiError(404, "Player Not Exist"));

  const team = await db.team.findByPk(teamId);
  if (!team) return next(new ApiError(404, "Team Not Exist"));

  const existPlayerInTeamAlready = await db.teamplayers.findOne({
    where: { player_id: playerId, team_id: teamId },
  });

  if (existPlayerInTeamAlready)
    return next(new ApiError(400, "Player Already Exist in Team"));

  await db.teamplayers.create({ team_id: teamId, player_id: playerId });

  return res.status(200).json({
    success: true,
    message: `${player.name} is Assigned to ${team.name} Successfully`,
  });
});

// ****** Tournament ********

// CREATE
const createTournament = TryCatch(async (req, res, next) => {
  const { name, schedule, location, tournamentType } = req.tournamentData; // coming from validation middleware

  const tournament = await db.tournament.create({
    name,
    schedule,
    location,
    tournament_type: tournamentType,
  });

  if (!tournament)
    return next(
      new ApiError(500, "Tournament Creation Failed from Server Side")
    );

  return res.status(200).json({
    success: true,
    message: `Tournament ${name} Created!`,
    tournament,
  });
});

// DELETE
const deleteTournament = TryCatch(async (req, res, next) => {
  const { tournamentId } = req.query;
  if (!tournamentId)
    return next(new ApiError(400, "Please Provide TournamentId"));

  const tournament = await db.tournament.destroy({
    where: { tournament_id: tournamentId },
  });

  if (!tournament) return next(new ApiError(404, "Tournament Not Found"));

  return res
    .status(200)
    .json({ success: true, message: `Tournament Deleted Successfully` });
});

const getTeamInfoOfTournament = TryCatch(async (req, res, next) => {
  const { tournamentId } = req.query;

  if (!tournamentId)
    return next(new ApiError(400, "Please Provide TournamentId"));

  const teams = await db.tournament.findOne({
    where: { tournament_id: tournamentId },
    include: [
      {
        model: db.team,
        as: "teams",
        attributes: [],
      },
    ],
  });

  if (!teams) return next(new ApiError(404, "No Teams Found in Tournament"));

  return res.status(200).json({ success: true, teams });
});

module.exports = {
  adminRegister,
  createTeam,
  getAllTeamsInfo,
  getTeamInfo,
  updateTeamInfo,
  deleteTeam,
  createPlayer,
  getPlayerInfo,
  assignPlayerToTeam,

  // Tournament
  getTeamInfoOfTournament,
  createTournament,
  deleteTournament,
};
