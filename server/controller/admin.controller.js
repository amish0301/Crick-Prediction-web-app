const { Op } = require("sequelize");
const db = require("../models");
const ApiError = require("../utils/ApiError");
const TryCatch = require("../utils/TryCatch");
const { uploadToCloudinary } = require("../utils/utils");

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

const logout = TryCatch(async (req, res, next) => {
  // remove admin
  const updatedUser = await db.user.update(
    { role: "user" },
    { where: { id: req.uId } }
  );

  if (updatedUser <= 0) return next(new ApiError(404, "User Not Found"));

  return res.status(200).json({ success: true, message: "Logged Out" });
});

// ******** Team *********
const createTeam = TryCatch(async (req, res, next) => {
  const { name, mainPlayers, matchesInfo } = req.teamData;

  // upload logo to cloudinary
  const logoUrl = await uploadToCloudinary(req.file.buffer, "teams");

  console.log('preview logo', logoUrl);

  const team = await db.team.create({
    name,
    logo: logoUrl,
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
  const { isPopulate } = req.query;

  if (!teamId) return next(new ApiError(400, "Please Provide TeamId"));

  const team = await db.team.findByPk(teamId);
  if (!team) return next(new ApiError(404, "Team Doesn't Exist"));

  if (isPopulate) {
    const players = await db.player.findAll({
      where: {
        player_id: {
          [Op.in]: team.main_players,
        },
      },
    });

    return res.status(200).json({ success: true, players });
  }

  return res.status(200).json({ success: true, team });
});

const updateTeamInfo = TryCatch(async (req, res, next) => {
  const { teamId } = req.params;

  if (!teamId) return next(new ApiError(400, "Please Provide TeamId"));

  // get data which wanted to be updated
  const { name, logo, addedPlayers = [], removedPlayers = [] } = req.body;

  const team = await db.team.findOne({
    where: { team_id: teamId },
    attributes: ["team_id", "name", "logo", "main_players"],
  });

  if (!team) return next(new ApiError(404, "Team Not Found"));

  let currentPlayers = new Set(team.main_players || []);

  if (removedPlayers) {
    removedPlayers.forEach((playerId) => currentPlayers.delete(playerId));
  }

  if (addedPlayers) {
    addedPlayers.forEach((playerId) => currentPlayers.add(playerId));
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

const teamBelongsToTournament = TryCatch(async (req, res, next) => {
  const { teamId } = req.query;

  if (!teamId) return next(new ApiError(400, "Please Provide TeamId"));

  const tournaments = await db.tournaments_teams.findAll({
    where: { team_id: teamId },
    attributes: ["tournament_id"],
  });

  if (!tournaments)
    return next(new ApiError(404, "No Tournament has played by this team"));

  return res.status(200).json({ success: true, tournaments });
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

  // players belongs to which team
  const playerTeam = await db.player.findOne({
    where: { player_id: playerId },
    include: [
      {
        model: db.team,
        as: "teams",
        attributes: ["team_id", "name"],
      },
    ],
  });

  return res.status(200).json({ success: true, player, playerTeam });
});

// WORKS BELOW
const assignPlayerToTeam = TryCatch(async (req, res, next) => {
  const { teamId, playerId, isRemove } = req.query;

  if (!teamId || !playerId)
    return next(new ApiError(400, "Please Provide TeamId and PlayerId"));

  const player = await db.player.findByPk(playerId);
  if (!player) return next(new ApiError(404, "Player Not Exist"));

  const team = await db.team.findByPk(teamId);
  if (!team) return next(new ApiError(404, "Team Not Exist"));

  // If isRemove is true then remove player from team
  if (isRemove === "true") {
    await db.teamplayers.destroy({
      where: { player_id: playerId, team_id: teamId },
    });
    await db.team.update(
      {
        main_players: db.sequelize.fn(
          "array_remove",
          db.sequelize.col("main_players"),
          playerId
        ),
      },
      { where: { team_id: teamId } }
    );

    return res.status(200).json({
      success: true,
      message: `${player.name} is Removed from ${team.name} Successfully`,
    });
  }

  const existPlayerInTeamAlready = await db.teamplayers.findOne({
    where: { player_id: playerId, team_id: teamId },
  });

  if (existPlayerInTeamAlready)
    return next(new ApiError(400, "Player Already Exist in Team"));

  await db.teamplayers.create({ team_id: teamId, player_id: playerId });

  // assign player info to team- [main_playes]
  await db.team.update(
    {
      main_players: db.sequelize.fn(
        "array_append",
        db.sequelize.col("main_players"),
        playerId
      ),
    },
    { where: { team_id: teamId } }
  );

  return res.status(200).json({
    success: true,
    message: `${player.name} is Assigned to ${team.name} Successfully`,
  });
});

// GET - ALL PLAYERS
const fetchAllPlayers = TryCatch(async (req, res, next) => {
  const players = await db.player.findAll();
  if (!players) return next(new ApiError(404, "No Players Found"));

  return res.status(200).json({ success: true, players });
});

const deletePlayer = TryCatch(async (req, res, next) => {
  const { playerId } = req.query;
  if (!playerId) return next(new ApiError(400, "Please Provide PlayerId"));

  const player = await db.player.destroy({ where: { player_id: playerId } });
  if (!player) return next(new ApiError(404, "Player Not Found"));

  return res
    .status(200)
    .json({ success: true, message: `Player Deleted Successfully` });
});

// ****** Tournament ********

const createTournament = TryCatch(async (req, res, next) => {
  const { name, schedule, totalTeams, location, tournamentType } =
    req.tournamentData; // coming from validation middleware

  const tournament = await db.tournament.create({
    name,
    schedule,
    location,
    total_teams: totalTeams,
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

const addTeamInTournament = TryCatch(async (req, res, next) => {
  const { teamId, tournamentId } = req.query;

  if (!teamId || !tournamentId)
    return next(new ApiError(400, "Please Provide TeamId and TournamentId"));

  const tournament = await db.tournament.findOne({
    where: { tournament_id: tournamentId, status: "upcoming" },
  });

  if (!tournament)
    return next(
      new ApiError(400, "You can only add team in Upcoming tournaments only")
    );

  await db.tournaments_teams.create({
    team_id: teamId,
    tournament_id: tournamentId,
  });

  return res
    .status(200)
    .json({ success: true, message: "Team Added to Tournament Successfully" });
});

const tournamentInfo = TryCatch(async (req, res, next) => {
  const { tournamentId } = req.params;

  let tournament;

  if (!tournamentId) {
    tournament = await db.tournament.findByPk(tournamentId);
    if (!tournament) return next(new ApiError(404, "Tournament Not Found"));
    return res.status(200).json({ success: true, tournament });
  }

  tournament = await db.tournament.findAll();
  if (!tournament) return next(new ApiError(404, "No Tournament Found"));
  return res.status(200).json({ success: true, tournaments: tournament });
});

const getAllTournament = TryCatch(async (req, res, next) => {
  const tournaments = await db.tournament.findAll();
  if (!tournaments) return next(new ApiError(404, "No Tournament Found"));

  return res.status(200).json({ success: true, tournaments });
});

const getAllAvailablePlayers = TryCatch(async (req, res, next) => {
  // find all assigned Players
  const assignedPlayers = await db.teamplayers.findAll({
    attributes: ["player_id"],
    raw: true,
  });

  // extract id from players
  const assignedPlayersIds = assignedPlayers.map((player) => player.player_id);

  const players = await db.player.findOne({
    where: {
      player_id: {
        [Op.notIn]: assignedPlayersIds.length > 0 ? assignedPlayersIds : [null],
      },
    },
  });

  return res.status(200).json({ success: true, players });
});

// ****** Matches ********
const assignMatchesToTournament = TryCatch(async (req, res, next) => {
  const { tournamentId } = req.query;

  const { matchSchedule, customMatches } = req.body;

  const tournament = await db.tournament.findByPk(tournamentId);
  if (!tournament) return next(new ApiError(404, "Tournament not Found"));

  const teams = await db.tournaments_teams.findAll({
    where: { tournament_id: tournamentId },
    attributes: ["team_id"],
  });

  if (!teams || teams.length < 2) {
    return next(new ApiError(400, "Not Enough Teams to create Matches"));
  }

  let matches = [];
  if (customMatches & (customMatches.length > 0)) {
    matches = customMatches.map((match) => ({
      tournament_id: tournamentId,
      team1_id: match.team1_id,
      team2_id: match.team2_id,
      match_time: match.match_time || matchSchedule,
    }));
  } else {
    for (let i = 0; i < teams.length - 1; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({
          tournament_id: tournamentId,
          team1_id: teams[i].team_id,
          team2_id: teams[j].team_id,
          match_time: matchSchedule || new Date(),
        });
      }
    }
  }

  await db.match.bulkCreate(matches);

  return res.status(200).json({
    success: true,
    message: `Matches Scheduled for ${tournament.name} Tournament`,
    matches,
  });
});

const createMatch = TryCatch(async (req, res, next) => {
  const { tournamentId } = req.query;

  const { team1Id, team2Id, match_time } = req.body;

  if (!team1Id || !team2Id || !match_time) {
    return next(
      new ApiError(
        400,
        "Please Provide versus team Ids and match Schedule Time"
      )
    );
  }

  const tournament = await db.tournament.findByPk(tournamentId);
  if (!tournament) return next(new ApiError(404, "Tournament Not Found"));

  const team1 = await db.team.findByPk(team1Id);
  const team2 = await db.team.findByPk(team2Id);

  if (!team1 || !team2)
    return next(new ApiError(404, "One or both teams not found"));

  const match = await db.match.create({
    tournament_id: tournamentId,
    team1_id: team1Id,
    team2_id: team2Id,
    match_time,
  });

  return res.status(200).json({
    success: true,
    message: `Match Scheduled between ${team1.name} Vs ${team2.name}`,
    match,
  });
});

const getAllMatchesOfTournament = TryCatch(async (req, res, next) => {
  const { tournamentId } = req.query;

  const tournament = await db.tournament.findByPk(tournamentId);
  if (!tournament) return next(new ApiError(404, "Tournament Not Exist"));

  const matches = await db.match.findAll({
    where: { tournament_id: tournamentId },
    include: [
      { model: db.team, as: "Team1", attributes: ["team_id", "name"] },
      { model: db.team, as: "Team2", attributes: ["team_id", "name"] },
      { model: db.team, as: "Winner", attributes: ["team_id", "name"] },
    ],
    order: [["match_time", "ASC"]],
  });

  return res.status(200).json({
    success: true,
    tournament_name: tournament.name,
    total_matches: matches.length,
    matches,
  });
});

const getMatch = TryCatch(async (req, res, next) => {
  const { matchId } = req.params;

  const match = await db.match.findByPk(matchId);

  if (!match) return next(new ApiError(404, "Match Data not found"));

  return res.status(200).json({ success: true, match });
});

const getMatchesFilterByStatus = TryCatch(async (req, res, next) => {
  const { status } = req.query;

  if (!status) return next(new ApiError(404, "Please Provide Match Status"));

  const matches = await db.match.findAll({
    where: { status },
  });

  return res.status(200).json({ success: true, matches });
});

const updateMatchInfo = TryCatch(async (req, res, next) => {
  const { matchId } = req.params;
  const { match_time, location, status } = req.body;

  const [totalRows, updatedMatch] = await db.match.update(
    {
      match_time,
      location,
      status,
    },
    { where: { match_id: matchId } }
  );

  if (totalRows <= 0)
    return next(new ApiError(500, "match Update Unsuccessful"));

  const name = updatedMatch[0].name;

  return res
    .status(200)
    .json({ success: true, message: `${name} is Updated Successfully!` });
});

const deleteMatch = TryCatch(async (req, res, next) => {
  const { matchId } = req.params;

  await db.match.destroy({
    where: { match_id: matchId },
  });

  return res
    .status(200)
    .json({ success: true, message: "Match Deleted Successfully" });
});

module.exports = {
  adminRegister,
  logout,
  createTeam,
  getAllTeamsInfo,
  getTeamInfo,
  updateTeamInfo,
  deleteTeam,
  teamBelongsToTournament,

  createPlayer,
  getPlayerInfo,
  assignPlayerToTeam,
  fetchAllPlayers,
  deletePlayer,
  getAllAvailablePlayers,

  // Tournament
  getTeamInfoOfTournament,
  createTournament,
  deleteTournament,
  addTeamInTournament,
  tournamentInfo,
  getAllTournament,

  // Matches
  assignMatchesToTournament,
  createMatch,
  getAllMatchesOfTournament,
  getMatch,
  updateMatchInfo,
  deleteMatch,
  getMatchesFilterByStatus,
};
