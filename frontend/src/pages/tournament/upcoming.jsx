import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import GroupsIcon from "@mui/icons-material/Groups";
import axiosInstance from "../../hooks/useAxios";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { setTeamPlayers, setMainPlayers } from '../../store/slices/admin';
import { useDispatch, useSelector } from 'react-redux'

const getRoleIcon = (role) => {
  if (role?.includes("Batsman")) return <SportsCricketIcon color="primary" />;
  if (role?.includes("Bowler")) return <SportsBaseballIcon color="error" />;
  if (role?.includes("All-Rounder")) return <GroupsIcon color="success" />;
  return <SportsCricketIcon color="secondary" />;
};

const Upcoming = () => {
  const [searchParams] = useSearchParams();
  const tournamentId = searchParams.get('tournamentId');
  const [assignedTeams, setAssignedTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [open, setOpen] = useState(false);
  const [matches, setMatches] = useState([]);
  const [tournamentDetails, setTournamentDetails] = useState({});
  const navigate = useNavigate();
  const { teamPlayers, mainPlayers } = useSelector(state => state?.admin);
  const [tabValue, setTabValue] = useState("upcoming");
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const [formData, setFormData] = useState({
    team1Id: '',
    team2Id: '',
    match_time: '',
    location: '',
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to check if a match is live
  const isMatchLive = (matchTime) => {
    const matchDate = new Date(matchTime);
    return currentTime >= matchDate;
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update live status whenever currentTime changes
  useEffect(() => {
    setMatches(prevMatches =>
      prevMatches.map(match => ({
        ...match,
        isLive: isMatchLive(match.match_time)
      }))
    );
  }, [currentTime]);

  // Fetch tournament details
  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/admin/tournament/${tournamentId}`);
        setTournamentDetails(res.data.tournaments);
      } catch (err) {
        console.error('Error fetching tournament details:', err.response?.data || err.message);
        toast.error('Failed to fetch tournament details');
      } finally {
        setLoading(false);
      }
    };

    const fetchAssignedTeams = async () => {
      try {
        const response = await axiosInstance.get(`/admin/tournaments?isPopulateTeams=true`);
        const tournaments = response.data.tournaments || [];
        const currentTournament = tournaments.find(t => t.tournament_id.toString() === tournamentId);

        if (currentTournament && currentTournament.teams) {
          setAssignedTeams(currentTournament.teams);
        } else {
          setAssignedTeams([]);
        }
      } catch (error) {
        console.error('Error fetching assigned teams:', error.response?.data || error.message);
        toast.error('Failed to fetch assigned teams');
      }
    };


    const fetchTeamPlayers = async () => {
      try {
          const response = await axiosInstance.get(`/admin/team/${teamId}?isPopulate=true`);

          if (response.data.success) {
              // Check if players data exists in the response
              if (!response.data.players) {
                  console.error('No players data in response');
                  dispatch(setTeamPlayers([]));  // Use dispatch instead of setTeamPlayers
                  setMainPlayers([]);
                  return;
              }

              // Correctly handle the nested players array
              const playersData = response.data.players.players || [];
              const mainPlayersIds = response.data.players.main_players || [];

              // Ensure we have an array to work with
              const players = Array.isArray(playersData) ? playersData : [];

              const formattedPlayers = players.map(player => {
                  const role = player.TeamPlayers?.role?.toUpperCase() || 'PLAYER';

                  return {
                      id: player.player_id,
                      name: player.name || 'Unnamed',
                      age: player.age || 'N/A',
                      position: player.position || 'N/A',
                      role,
                      isCaptain: role === 'CAPTAIN',
                      isMain: role === 'MAIN' || role === 'CAPTAIN'  // ✅ Treat CAPTAIN as MAIN also
                  };
              });

              // Dispatch the array as a single argument, not spread
              dispatch(setTeamPlayers(formattedPlayers));
              dispatch(setMainPlayers(formattedPlayers.filter(player => player.isMain)));
          }
      } catch (error) {
          console.error('Fetch team players error:', error);
          dispatch(setTeamPlayers([]));  // Use dispatch in error case too
          setMainPlayers([]);
      }
  };

    const fetchMatches = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/admin/tournament/matches/${tournamentId}`);
        if (res.data.success) {
          setMatches((res.data.matches || []).map(match => ({
            ...match,
            isLive: isMatchLive(match.match_time)
          })));
        } else {
          setMatches([]);
          toast.error('No matches found for this tournament');
        }
      } catch (err) {
        console.error('Error fetching matches:', err.response?.data || err.message);
        toast.error('Failed to fetch matches');
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) {
      fetchTournamentDetails();
      fetchAssignedTeams();
      fetchMatches();
    }
  }, [tournamentId]);

  // Calculate time remaining until match
  const getTimeRemaining = (matchTime) => {
    const matchDate = new Date(matchTime);
    const now = new Date();

    if (now >= matchDate) {
      return "Live Now 🔴";
    }

    const totalSeconds = Math.floor((matchDate - now) / 1000);

    if (totalSeconds <= 0) {
      return "Live Now 🔴";
    }

    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return `${minutes}m ${seconds}s`;
    }
  };

  // Filter matches based on their status
  const liveMatches = matches.filter(match => match.isLive);
  const upcomingMatches = matches.filter(match => !match.isLive);
  const completedMatches = []; // For future implementation

  // Prepare teamSquads and teamFlags dynamically
  const teamSquads = assignedTeams.reduce((acc, team) => {
    acc[team.name] = team.teamPlayers || ['Virat Kohli'];
    return acc;
  }, {});

  const teamFlags = assignedTeams.reduce((acc, team) => {
    acc[team.name] = team.logo || "https://flagcdn.com/w40/xx.png";
    return acc;
  }, {});

  const handleOpen = (team) => {
    setSelectedTeam(team);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Get team name by id
  const getTeamNameById = (teamId) => {
    const team = assignedTeams.find(team => team.team_id.toString() === teamId?.toString());
    return team?.name || "Unknown Team";
  };

  
  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }

      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Render match card
  const renderMatchCard = (match) => {
    const team1Name = getTeamNameById(match.team1_id);
    const team2Name = getTeamNameById(match.team2_id);
    const timeRemaining = getTimeRemaining(match.match_time);
    const isLive = timeRemaining === "Live Now 🔴";

    return (
      <Grid key={match.match_id} xs={12} sm={6} md={4}>
        <Card sx={{ p: 2, textAlign: "center", height: "100%" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              {team1Name} vs {team2Name}
            </Typography>

            {isLive ? (
              <Typography variant="body2" color="error" sx={{ mb: 2, fontWeight: "bold" }}>
                Live Now 🔴
              </Typography>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {match.location || "Venue TBD"} - {formatDate(match.match_time)}
                </Typography>
                <Typography variant="body1" color="primary" sx={{ mb: 2, fontWeight: "bold" }}>
                  Starts in: {timeRemaining}
                </Typography>
              </>
            )}

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "#1565C0",
                  "&:hover": { backgroundColor: "#0D47A1" },
                }}
                onClick={() => handleOpen(team1Name)}
                disabled={!teamSquads[team1Name]}
              >
                <img
                  src={teamFlags[team1Name] || "https://flagcdn.com/w40/xx.png"}
                  alt={team1Name}
                  width={24}
                  height={16}
                />
                {team1Name} Squad
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "#D32F2F",
                  "&:hover": { backgroundColor: "#B71C1C" },
                }}
                onClick={() => handleOpen(team2Name)}
                disabled={!teamSquads[team2Name]}
              >
                <img
                  src={teamFlags[team2Name] || "https://flagcdn.com/w40/xx.png"}
                  alt={team2Name}
                  width={24}
                  height={16}
                />
                {team2Name} Squad
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  // Render no matches message
  const renderNoMatchesMessage = (message) => (
    <Grid xs={12}>
      <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          {message}
        </Typography>
      </Paper>
    </Grid>
  );

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Attractive Title */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, textAlign: "center", background: "#fffbe6" }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ fontFamily: "Georgia, serif", color: "#2C3E50" }}
        >
          {tournamentDetails?.name || 'Tournament'}
        </Typography>
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Live Matches" value="live" />
          <Tab label="Upcoming Matches" value="upcoming" />
          <Tab label="Completed Matches" value="completed" />
        </Tabs>
      </Box>

      {/* Match Cards based on selected tab */}
      <Grid container spacing={2} justifyContent="center">
        {tabValue === "live" && (
          liveMatches.length > 0 
            ? liveMatches.map(match => renderMatchCard(match))
            : renderNoMatchesMessage("No live matches at the moment")
        )}

        {tabValue === "upcoming" && (
          upcomingMatches.length > 0 
            ? upcomingMatches.map(match => renderMatchCard(match))
            : renderNoMatchesMessage("No upcoming matches found for this tournament")
        )}

        {tabValue === "completed" && (
          completedMatches.length > 0 
            ? completedMatches.map(match => renderMatchCard(match))
            : renderNoMatchesMessage("No completed matches found for this tournament")
        )}
      </Grid>

      {/* Team Squad Modal */}
      {selectedTeam && teamSquads[selectedTeam] && (
        <Modal open={open} onClose={handleClose} aria-labelledby="team-squad-modal">
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "50%", md: "40%" },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              maxHeight: "90vh",
              overflow: "auto"
            }}
          >
            {/* Team Title with Flag */}
            <Typography
              variant="h6"
              color="primary"
              mb={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <img
                src={teamFlags[selectedTeam] || "https://flagcdn.com/w40/xx.png"}
                alt={selectedTeam}
                width={32}
                height={24}
              />
              {selectedTeam} Squad
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Players List */}
            {teamSquads[selectedTeam].length > 0 ? (
              <>
                {/* Captain Section (if first player is captain) */}
                {teamSquads[selectedTeam][0] && (
                  <Paper
                    sx={{
                      p: 2,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      boxShadow: 2,
                      borderRadius: 1,
                      bgcolor: "#e3f2fd",
                      width: "100%",
                      fontSize: "1.2rem",
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      Captain: {teamSquads[selectedTeam][0].name}
                    </Typography>
                    {getRoleIcon(teamSquads[selectedTeam][0].role)}
                  </Paper>
                )}

                {/* Players Grid */}
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6}>
                    {teamSquads[selectedTeam].slice(1, Math.ceil(teamSquads[selectedTeam].length / 2)).map((player, index) => (
                      <Paper
                        key={index}
                        sx={{
                          p: 2,
                          mb: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 2,
                          boxShadow: 2,
                          borderRadius: 1,
                        }}
                      >
                        {getRoleIcon(player.role)}
                        <Typography variant="body2" fontWeight="bold">
                          {player.name}
                        </Typography>
                      </Paper>
                    ))}
                  </Grid>

                  <Grid item xs={6}>
                    {teamSquads[selectedTeam].slice(Math.ceil(teamSquads[selectedTeam].length / 2)).map((player, index) => (
                      <Paper
                        key={index}
                        sx={{
                          p: 2,
                          mb: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 2,
                          boxShadow: 2,
                          borderRadius: 1,
                        }}
                      >
                        {getRoleIcon(player.role)}
                        <Typography variant="body2" fontWeight="bold">
                          {player.name}
                        </Typography>
                      </Paper>
                    ))}
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography variant="body1" color="text.secondary">
                {teamSquads}
              </Typography>
            )}

            <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </Container>
  );
};

export default Upcoming;