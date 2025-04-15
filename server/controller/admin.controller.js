const { Op, where } = require("sequelize");
const db = require("../models");
const ApiError = require("../utils/ApiError");
const TryCatch = require("../utils/TryCatch");
const { uploadToCloudinary } = require("../utils/utils");
const {
  getDataFromCache,
  setDataFromCache,
  removeDataFromCache,
} = require("../utils/redis-getter-setter");

const adminRegister = TryCatch(async (req, res, next) => {
  const { email, adminKey } = req.body;

  if (!adminKey) return next(new ApiError(404, "Please Provide Admin Key"));

  if (adminKey && adminKey !== process.env.ADMIN_SECRET)
    return next(new ApiError(400, "Invalid Admin Key"));

  // returns number of updated rows
  const updatedUser = await db.User.update(
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
  const updatedUser = await db.User.update(
    { role: "User" },
    { where: { id: req.uId } }
  );

  if (updatedUser <= 0) return next(new ApiError(404, "User Not Found"));

  return res.status(200).json({ success: true, message: "Logged Out" });
});

const getAllUsers = TryCatch(async (req, res, next) => {
  const cachedUsers = await getDataFromCache("All_Users");
  if (cachedUsers) {
    return res.status(200).json({
      success: true,
      users: JSON.parse(cachedUsers),
      message: "Received from Cache",
    });
  }

  const users = await db.User.findAll({
    where: {
      role: {
        [Op.or]: ["admin", "user"],
      },
    },
    attributes: { exclude: ["password"] },
  });

  if (!users) return next(new ApiError(404, "No Users Found"));

  setDataFromCache("All_Users", JSON.stringify(users), 60 * 30);
  return res.status(200).json({ success: true, users });
});

// ******** Team *********
const createTeam = TryCatch(async (req, res, next) => {
  const { name } = req.teamData;

  // upload logo to cloudinary
  const logoUrl = await uploadToCloudinary(req.file.buffer, "teams");

  const team = await db.Team.create({
    name,
    logo: logoUrl,
  });

  if (!team)
    return next(new ApiError(500, "Team Creation Failed from Server Side"));

  const cachedTeams = await getDataFromCache("All_Teams");
  if (cachedTeams) removeDataFromCache("All_Teams");

  return res
    .status(200)
    .json({ success: true, message: `Team ${name} Created!`, team });
});

const getAllTeamsInfo = TryCatch(async (req, res, next) => {
  // check if data exist
  const cachedTeams = await getDataFromCache("All_Teams");
  if (cachedTeams) {
    return res.status(200).json({
      success: true,
      teams: JSON.parse(cachedTeams),
      message: "Received from Cached",
    });
  }

  const teams = await db.Team.findAll();
  if (!teams) return next(new ApiError(404, "No Teams Found"));

  // set before returning
  setDataFromCache("All_Teams", JSON.stringify(teams), 60 * 30);
  return res.status(200).json({ success: true, teams });
});

const getTeamInfo = TryCatch(async (req, res, next) => {
  const { teamId } = req.params;
  const { isPopulate } = req.query;

  if (!teamId) return next(new ApiError(400, "Please Provide TeamId"));

  const team = await db.Team.findByPk(teamId);
  if (!team) return next(new ApiError(404, "Team Doesn't Exist"));

  if (isPopulate) {
    const players = await db.Team.findByPk(teamId, {
      include: [
        {
          model: db.Player,
          as: "players",
          through: {
            attributes: ["role"],
          },
        },
      ],
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

  const team = await db.Team.findOne({
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

  // invalidate cache
  const cachedTeams = await getDataFromCache("All_Teams");
  if (cachedTeams) removeDataFromCache("All_Teams");

  const team = await db.Team.destroy({ where: { team_id: teamId } });

  if (!team) return next(new ApiError(404, "Team Not Found"));

  return res
    .status(200)
    .json({ success: true, message: `Team Deleted Successfully` });
});

const teamBelongsToTournament = TryCatch(async (req, res, next) => {
  const { teamId } = req.query;

  if (!teamId) return next(new ApiError(400, "Please Provide TeamId"));

  const tournaments = await db.TournamentTeams.findAll({
    where: { team_id: teamId },
    attributes: ["tournament_id"],
  });

  if (!tournaments)
    return next(new ApiError(404, "No Tournament has played by this team"));

  return res.status(200).json({ success: true, tournaments });
});

const assignMainPlayerRole = TryCatch(async (req, res, next) => {
  const { teamId } = req.query;

  const { players } = req.body; // ALL Players of Team
  // map for role to id
  const idToRole = new Map();

  if (players) {
    players.forEach((player) => idToRole.set(player.id, player.role));
  }

  if (!players || players.length === 0) {
    return next(new ApiError(400, "Please provide Main Players"));
  }

  // assign as Main to playerIDS
  const currentPlayers = await db.TeamPlayers.findAll({
    where: {
      team_id: teamId,
      player_id: { [Op.in]: players.map((player) => player.id) },
    },
    attributes: ["player_id", "role"],
  });

  if (!currentPlayers || currentPlayers.length == 0)
    return next(new ApiError(404, "No Players found for provided players"));

  const updatedPlayers = currentPlayers.map((player) => ({
    player_id: player.player_id,
    team_id: teamId,
    role: idToRole.get(player.player_id),
  }));

  await db.TeamPlayers.bulkCreate(updatedPlayers, {
    updateOnDuplicate: ["role"],
  });

  const mainPlayers = await db.TeamPlayers.findAll({
    where: {
      team_id: teamId,
      role: { [Op.or]: ["MAIN", "CAPTAIN"] },
    },
    attributes: ["player_id"],
  });

  const mainPlayerIds = mainPlayers.map((player) => player.player_id);

  await db.Team.update(
    { main_players: mainPlayerIds.length > 0 ? mainPlayerIds : [] },
    { where: { team_id: teamId } }
  );

  // invalidate all teams cached data
  const cachedTeams = await getDataFromCache("All_Teams");
  if (cachedTeams) removeDataFromCache("All_Teams");

  idToRole.clear();
  return res
    .status(200)
    .json({ success: true, message: "Players Role Updated" });
});

const togglePlayerRoleInTeam = TryCatch(async (req, res, next) => {
  const { teamId, playerId } = req.query;
  const { role } = req.body;

  if (!teamId || !playerId)
    return next(new ApiError(400, "Please Provide TeamId and PlayerId"));

  const player = await db.TeamPlayers.findOne({
    where: { team_id: teamId, player_id: playerId },
    attributes: ["player_id", "role"],
  });

  if (!player) return next(new ApiError(404, "Player Not Found"));

  await db.TeamPlayers.update(
    { role },
    { where: { team_id: teamId, player_id: playerId } }
  );

  return res.status(200).json({
    success: true,
    message: `${player.name} Role Updated to ${role}`,
  });
});

// ******* Players ********
const createPlayer = TryCatch(async (req, res, next) => {
  const { name, age, role } = req.playerData;

  const player = await db.Player.create({
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

  const player = await db.Player.findByPk(playerId);
  if (!player) return next(new ApiError(404, "Player Not Found"));

  // players belongs to which team
  const playerTeam = await db.Player.findOne({
    where: { player_id: playerId },
    include: [
      {
        model: db.Team,
        as: "teams",
        attributes: ["team_id", "name"],
      },
    ],
  });

  return res.status(200).json({ success: true, player, playerTeam });
});

const assignPlayerToTeam = TryCatch(async (req, res, next) => {
  const { teamId, playerId, isRemove } = req.query;

  if (!teamId || !playerId)
    return next(new ApiError(400, "Please Provide TeamId and PlayerId"));

  const player = await db.Player.findByPk(playerId);
  if (!player) return next(new ApiError(404, "Player Not Exist"));

  const team = await db.Team.findByPk(teamId);
  if (!team) return next(new ApiError(404, "Team Not Exist"));

  // invalidate cache
  const cachedTeams = await getDataFromCache("All_Teams");
  if (cachedTeams) removeDataFromCache("All_Teams");

  // If isRemove is true then remove player from team
  if (isRemove === "true") {
    const isPlayerExist = await db.TeamPlayers.findOne({
      where: { team_id: teamId, player_id: playerId },
    });

    if (!isPlayerExist)
      return next(new ApiError(404, "Player Doesn't Exist in Team"));

    await db.TeamPlayers.destroy({
      where: { player_id: playerId, team_id: teamId },
    });

    // remove from main_players
    const [updated, updatedTeams] = await db.Team.update(
      {
        main_players: db.Sequelize.fn(
          "array_remove",
          team.main_players,
          playerId
        ),
      },
      { where: { team_id: teamId } }
    );

    // update cache
    await setDataFromCache("All_Teams", JSON.stringify(updatedTeams), 60 * 30);

    return res.status(200).json({
      success: true,
      message: `${player.name} is Removed from ${team.name} Successfully`,
    });
  }

  const existPlayerInTeamAlready = await db.TeamPlayers.findOne({
    where: { player_id: playerId, team_id: teamId },
  });

  if (existPlayerInTeamAlready)
    return next(new ApiError(400, "Player Already Exist in Team"));

  await db.TeamPlayers.create({ team_id: teamId, player_id: playerId });

  return res.status(200).json({
    success: true,
    message: `${player.name} is Assigned to ${team.name} Successfully`,
  });
});

// GET - ALL PLAYERS
const fetchAllPlayers = TryCatch(async (req, res, next) => {
  const players = await db.Player.findAll();
  if (!players) return next(new ApiError(404, "No Players Found"));

  return res.status(200).json({ success: true, players });
});

const deletePlayer = TryCatch(async (req, res, next) => {
  const { playerId } = req.query;
  if (!playerId) return next(new ApiError(400, "Please Provide PlayerId"));

  const player = await db.Player.destroy({ where: { player_id: playerId } });
  if (!player) return next(new ApiError(404, "Player Not Found"));

  return res
    .status(200)
    .json({ success: true, message: `Player Deleted Successfully` });
});

// ****** Tournament ********

const createTournament = TryCatch(async (req, res, next) => {
  const { name, schedule, totalTeams, location, tournamentType } =
    req.tournamentData; // coming from validation middleware

  const tournament = await db.Tournament.create({
    name,
    schedule,
    location,
    total_teams: totalTeams,
    tournament_type: tournamentType,
  });

  // invalidate cache
  const cachedTournaments = await getDataFromCache("All_Tournaments");
  if (cachedTournaments) removeDataFromCache("All_Tournaments");

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

  const tournament = await db.Tournament.destroy({
    where: { tournament_id: tournamentId },
  });

  // invalidate cache
  const cachedTournaments = await getDataFromCache("All_Tournaments");
  if (cachedTournaments) removeDataFromCache("All_Tournaments");

  if (!tournament) return next(new ApiError(404, "Tournament Not Found"));

  return res
    .status(200)
    .json({ success: true, message: `Tournament Deleted Successfully` });
});

const getTeamInfoOfTournament = TryCatch(async (req, res, next) => {
  const { isPopulateTeamPlayers } = req.query;
  const { tournamentId } = req.params;

  if (!tournamentId)
    return next(new ApiError(400, "Please Provide TournamentId"));

  const teams = await db.Tournament.findOne({
    where: { tournament_id: tournamentId },
    include: [
      {
        model: db.Team,
        as: "teams",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        through: { attributes: [] },
      },
    ],
  });

  if (!teams) return next(new ApiError(404, "No Teams Found in Tournament"));

  if (isPopulateTeamPlayers === "true") {
    for (const team of teams.teams) {
      if (Array.isArray(team.main_players) && team.main_players.length > 0) {
        const players = await db.Player.findAll({
          where: { player_id: { [Op.in]: team.main_players } },
          attributes: ["player_id", "name", "position"],
        });
        team.setDataValue("players", players);
      } else {
        team.setDataValue("players", []);
      }
    }
  }

  if (!teams) return next(new ApiError(404, "No Teams Found in Tournament"));

  return res.status(200).json({ success: true, teams });
});

const deleteTeamInTournament = TryCatch(async (req, res, next) => {
  const { tournamentId } = req.params;
  const { teamId } = req.query;

  if (!tournamentId || !teamId)
    return next(new ApiError(400, "Please Provide TournamentId and TeamId"));

  const tournament = await db.Tournament.findByPk(tournamentId);
  if (!tournament) return next(new ApiError(404, "Tournament Not Found"));
  const team = await db.Team.findByPk(teamId);
  if (!team) return next(new ApiError(404, "Team Not Found"));

  const deletedTournament = await db.TournamentTeams.destroy({
    where: {
      tournament_id: tournamentId,
      team_id: teamId,
    },
  });

  if (!deletedTournament)
    return next(new ApiError(404, "Team Not Found in Tournament"));

  // invalidate cache
  const cachedTournaments = await getDataFromCache("All_Tournaments");
  if (cachedTournaments) removeDataFromCache("All_Tournaments");

  return res.status(200).json({
    success: true,
    message: "Team Deleted from Tournament Successfully",
  });
});

const addTeamInTournament = TryCatch(async (req, res, next) => {
  const { teamId, tournamentId } = req.query;

  if (!teamId || !tournamentId)
    return next(new ApiError(400, "Please Provide TeamId and TournamentId"));

  const tournament = await db.Tournament.findOne({
    where: { tournament_id: tournamentId, status: "upcoming" },
  });

  if (!tournament)
    return next(
      new ApiError(400, "You can only add team in Upcoming tournaments only")
    );

  await db.TournamentTeams.create({
    team_id: teamId,
    tournament_id: tournamentId,
  });

  // invalidate cache
  const cachedTournaments = await getDataFromCache("All_Tournaments");
  if (cachedTournaments) removeDataFromCache("All_Tournaments");

  return res
    .status(200)
    .json({ success: true, message: "Team Added to Tournament Successfully" });
});

const tournamentInfo = TryCatch(async (req, res, next) => {
  const { tournamentId } = req.params;

  const tournament = await db.Tournament.findByPk(tournamentId);

  if (!tournament) return next(new ApiError(404, "No Tournament Found"));
  return res.status(200).json({ success: true, tournaments: tournament });
});

const getAllTournament = TryCatch(async (req, res, next) => {
  const { isPopulateTeams, isPopulatePlayersInfo } = req.query;

  // check if cached data
  const cachedTournaments = await getDataFromCache("All_Tournaments");
  if (cachedTournaments) {
    return res.status(200).json({
      success: true,
      tournaments: JSON.parse(cachedTournaments),
      message: "Received from Cached",
    });
  }

  const tournaments = await db.Tournament.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      isPopulateTeams === "true" && {
        model: db.Team,
        as: "teams",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        through: { attributes: [] },
      },
    ].filter(Boolean),
  });

  if (!tournaments || tournaments.length === 0) {
    return next(new ApiError(404, "No Tournament Found"));
  }

  if (isPopulatePlayersInfo === "true") {
    for (const tournament of tournaments) {
      for (const team of tournament.teams) {
        if (Array.isArray(team.main_players) && team.main_players.length > 0) {
          const players = await db.Player.findAll({
            where: { player_id: { [Op.in]: team.main_players } },
            attributes: ["player_id", "name", "position"],
          });
          team.setDataValue("players", players);
        } else {
          team.setDataValue("players", []);
        }
      }
    }
  }

  // set before returning
  setDataFromCache("All_Tournaments", JSON.stringify(tournaments), 60 * 15);

  return res.status(200).json({ success: true, tournaments });
});

const getAllAvailablePlayers = TryCatch(async (req, res, next) => {
  // find all assigned Players
  const assignedPlayers = await db.TeamPlayers.findAll({
    attributes: ["player_id"],
    raw: true,
  });

  // extract id from players
  const assignedPlayersIds = assignedPlayers.map((player) => player.player_id);

  let players;
  if (assignedPlayersIds.length > 0) {
    players = await db.Player.findAll({
      where: { player_id: { [Op.notIn]: assignedPlayersIds } },
    });
  } else {
    players = await db.Player.findAll();
  }

  return res.status(200).json({ success: true, players });
});

// ****** Matches ********
const assignMatchesToTournament = TryCatch(async (req, res, next) => {
  const { tournamentId } = req.query;

  const { matchSchedule, customMatches } = req.body;

  const tournament = await db.Tournament.findByPk(tournamentId);
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

  await db.Match.bulkCreate(matches);

  return res.status(200).json({
    success: true,
    message: `Matches Scheduled for ${tournament.name} Tournament`,
    matches,
  });
});

const createMatch = TryCatch(async (req, res, next) => {
  const { tournamentId } = req.query;

  const { team1Id, team2Id, match_time, location } = req.body;

  if (!team1Id || !team2Id || !match_time) {
    return next(
      new ApiError(
        400,
        "Please Provide versus team Ids and match Schedule Time"
      )
    );
  }

  const tournament = await db.Tournament.findByPk(tournamentId);
  if (!tournament) return next(new ApiError(404, "Tournament Not Found"));

  const team1 = await db.Team.findByPk(team1Id);
  const team2 = await db.Team.findByPk(team2Id);

  if (!team1 || !team2)
    return next(new ApiError(404, "One or both teams not found"));

  const match = await db.Match.create({
    tournament_id: tournamentId,
    team1_id: team1Id,
    team2_id: team2Id,
    match_time,
    location,
  });

  const cachedMatches = await getDataFromCache(
    `Matches_Tournament_${tournamentId}`
  );
  if (cachedMatches) removeDataFromCache(`Matches_Tournament_${tournamentId}`);

  return res.status(200).json({
    success: true,
    message: `Match Scheduled between ${team1.name} Vs ${team2.name}`,
    match,
  });
});

const getAllMatchesOfTournament = TryCatch(async (req, res, next) => {
  const { tournamentId } = req.params;

  const tournament = await db.Tournament.findByPk(tournamentId);
  if (!tournament) return next(new ApiError(404, "Tournament Not Exist"));

  // get from cache if available
  const cachedMatches = await getDataFromCache(
    `Matches_Tournament_${tournamentId}`
  );

  if (cachedMatches) {
    return res.status(200).json({
      success: true,
      matches: JSON.parse(cachedMatches),
      message: "Received from Cache",
      redisKey: `Matches_Tournament_${tournamentId}`,
    });
  }

  const matches = await db.Match.findAll({
    where: { tournament_id: tournamentId },
    include: [
      { model: db.Team, as: "Team1", attributes: ["team_id", "name"] },
      { model: db.Team, as: "Team2", attributes: ["team_id", "name"] },
      { model: db.Team, as: "Winner", attributes: ["team_id", "name"] },
    ],
    order: [["match_time", "ASC"]],
  });

  // set cache
  setDataFromCache(
    `Matches_Tournament_${tournamentId}`,
    JSON.stringify(matches),
    60 * 30
  );

  return res.status(200).json({
    success: true,
    tournament_name: tournament.name,
    total_matches: matches.length,
    matches,
  });
});

const getMatch = TryCatch(async (req, res, next) => {
  const { matchId } = req.params;

  const match = await db.Match.findByPk(matchId);

  if (!match) return next(new ApiError(404, "Match Data not found"));

  return res.status(200).json({ success: true, match });
});

const getMatchesFilterByStatus = TryCatch(async (req, res, next) => {
  const { status } = req.query;

  if (!status) return next(new ApiError(404, "Please Provide Match Status"));

  const matches = await db.Match.findAll({
    where: { status },
  });

  return res.status(200).json({ success: true, matches });
});

const updateMatchInfo = TryCatch(async (req, res, next) => {
  const { matchId } = req.params;
  const { match_time, location, status } = req.body;

  const [totalRows, updatedMatch] = await db.Match.update(
    {
      match_time,
      location,
      status,
    },
    { where: { match_id: matchId } }
  );

  if (totalRows <= 0)
    return next(new ApiError(500, "match Update Unsuccessful"));

  const cachedMatches = await getDataFromCache(
    `Matches_Tournament_${updatedMatch[0].tournament_id}`
  );
  if (cachedMatches)
    removeDataFromCache(`Matches_Tournament_${updatedMatch[0].tournament_id}`);

  const name = updatedMatch[0].name;

  return res
    .status(200)
    .json({ success: true, message: `${name} is Updated Successfully!` });
});

const deleteMatch = TryCatch(async (req, res, next) => {
  const { matchId } = req.params;

  const match = await db.Match.findByPk(matchId);
  if (!match) return next(new ApiError(404, "Match Not Found"));

  await db.Match.destroy({
    where: { match_id: matchId },
  });

  // check matches data cached then invalidate
  const cachedMatches = await getDataFromCache(
    `Matches_Tournament_${match.tournament_id}`
  );

  if (cachedMatches)
    removeDataFromCache(`Matches_Tournament_${match.tournament_id}`);

  return res
    .status(200)
    .json({ success: true, message: "Match Deleted Successfully" });
});

module.exports = {
  adminRegister,
  logout,
  getAllUsers,
  createTeam,
  getAllTeamsInfo,
  getTeamInfo,
  updateTeamInfo,
  deleteTeam,
  teamBelongsToTournament,
  assignMainPlayerRole,

  createPlayer,
  getPlayerInfo,
  assignPlayerToTeam,
  fetchAllPlayers,
  deletePlayer,
  getAllAvailablePlayers,
  togglePlayerRoleInTeam,

  // Tournament
  getTeamInfoOfTournament,
  deleteTeamInTournament,
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
